import upperFirst from "lodash/upperFirst";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import prisma from "~/lib/prisma";
import parseCSVLine from "~/utils/parseCSVLine";
import productExists from "~/utils/productExists";

interface CustomNextApiRequest extends NextApiRequest {
  [x: string]: any;
  body: string;
}

const handleSortRelations = ({
  sort,
  order,
}: {
  sort: string | string[] | undefined;
  order: string | string[] | undefined;
}) => {
  const sortField = sort ? upperFirst(String(sort)) : "code";
  const orderSetting = order ? String(order) : "asc";

  return String(sortField).indexOf(".") !== -1
    ? {
        [sortField.split(".")[0]]: {
          [sortField.split(".")[1]]: orderSetting,
        },
      }
    : {
        [sortField]: orderSetting,
      };
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ProductsType.ProductsList>
) {
  await NextCors(req, res, {
    methods: "PUT,POST,PATCH,DELETE,GET".split(","),
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method == "GET") {
    GET(req, res);
  } else if (req.method == "POST") {
    POST(req, res);
  } else if (req.method == "PUT") {
    PUT(req, res);
  }
}

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<ProductsType.ProductsList>
) => {
  const { page, perPage, sort, order } = req.query;

  const orderBy = handleSortRelations({
    sort,
    order,
  });

  const transactionResult = await prisma.$transaction([
    prisma.product.count({}),
    prisma.product.findMany({
      select: {
        code: true,
        name: true,
        costPrice: true,
        salesPrice: true,
      },
      take: Number(perPage || 10),
      skip:
        Number(page || 1) === 1
          ? 0
          : Number(perPage || 10) * Number(page || 1) - 10,
      orderBy,
    }),
  ]);

  const mapper = (value: any) => {
    return {
      id: value.id,
      code: value.code,
      name: value.name,
      costPrice: value.costPrice,
      salesPrice: value.salesPrice,
    };
  };

  res.json({
    total: transactionResult[0],
    data: transactionResult[1].map(mapper),
  });
};

// ...

const POST = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  const errors = new Set<string>();
  const productsOk = [];
  const updatedPrices: { [key: string]: number } = {};

  try {
    const csvLines = body.trim().split("\n").slice(5, -2);
    const jsonDataArray = [];
    for (const line of csvLines) {
      jsonDataArray.push(parseCSVLine(line));
    }
    for (const jsonData of jsonDataArray) {
      if (!jsonData.productCode || !jsonData.newPrice) {
        errors.add("Todos os campos necessários devem ser fornecidos no csv.");
        continue;
      }

      if (!(await productExists(Number(jsonData.productCode)))) {
        errors.add(`O código de produto ${jsonData.productCode} não existe.`);
        continue;
      }

      const productCode = Number(jsonData.productCode);

      const packageComponents = await prisma.pack.findMany({
        where: { productId: productCode },
      });

      const price = parseFloat(String(jsonData.newPrice));
      if (isNaN(price) || price <= 0) {
        errors.add(
          `O novo preço do produto ${jsonData.productCode} deve ser um valor numérico válido maior que zero.`
        );
        continue;
      }

      const productStringify = JSON.stringify(await productExists(productCode));

      const costPrice = JSON.parse(productStringify).costPrice;

      if (price < costPrice) {
        errors.add(
          `O preço de venda do produto ${jsonData.productCode} não pode ser menor que o preço de custo.`
        );
        continue;
      }

      const currentPrice = JSON.parse(productStringify).salesPrice;

      const maxAllowedPrice = currentPrice * 1.1;
      const minAllowedPrice = currentPrice * 0.9;

      if (price > maxAllowedPrice) {
        errors.add(
          `O reajuste do preço de venda do produto ${jsonData.productCode} deve ser no máximo 10% maior do que o preço atual.`
        );
        continue;
      }

      if (price < minAllowedPrice) {
        errors.add(
          `O reajuste do preço de venda do produto ${jsonData.productCode} deve ser no mínimo 10% menor do que o preço atual.`
        );
        continue;
      }

      const productParse = JSON.parse(productStringify);
      const product = {
        code: productParse.code,
        name: productParse.name,
        costPrice: productParse.costPrice,
        salesPrice: productParse.salesPrice,
        newPrice: String(jsonData.newPrice),
      };
      productsOk.push(product);
    }

    if (errors.size > 0) {
      res.status(200).json({
        error: true,
        products: productsOk,
        messages: Array.from(errors).map((error) => ({
          title: error,
          full: error,
        })),
      });
    } else {
      const createFeedback = {
        products: productsOk,
      };
      res.status(200).json(createFeedback);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      message: err instanceof Error ? err.message : "Unknown error occurred.",
    });
  }
};

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  const errors = new Set<string>();
  const productsOk = [];
  const updatedPrices: { [key: string]: number } = {};

  try {
    const csvLines = body.trim().split("\n").slice(5, -2);
    const jsonDataArray = [];
    let totalNewPackPrice = 0;
    const packIdsToUpdate = [];
    for (const line of csvLines) {
      jsonDataArray.push(parseCSVLine(line));
    }
    for (const jsonData of jsonDataArray) {
      const productCode = Number(jsonData.productCode);

      const packageComponents = await prisma.pack.findMany({
        where: { productId: productCode },
      });

      const price = parseFloat(String(jsonData.newPrice));
      if (isNaN(price) || price <= 0) {
        errors.add(
          `O novo preço do produto ${jsonData.productCode} deve ser um valor numérico válido maior que zero.`
        );
        continue;
      }

      if (packageComponents.length > 0) {
        for (const packageComponent of packageComponents) {
          const packId = packageComponent.packId;
          packIdsToUpdate.push(packId);

          const pack = await prisma.pack.findUnique({
            where: { id: packId },
          });

          const newPackPrice = price * packageComponent.qty;
          totalNewPackPrice += newPackPrice;

          const newComponentPrice = newPackPrice / packageComponent.qty;

          await prisma.product.update({
            where: { code: packageComponent.productId },
            data: { salesPrice: newComponentPrice },
          });
        }
        console.log(totalNewPackPrice);
        console.log(packIdsToUpdate);
        // Após somar todos os valores no loop, atualize totalNewPackPrice para cada packId no array
        for (const packIdToUpdate of packIdsToUpdate) {
          await prisma.product.update({
            where: { code: packIdToUpdate },
            data: { salesPrice: totalNewPackPrice },
          });
        }
      }

      await prisma.product.update({
        where: { code: productCode },
        data: { salesPrice: price },
      });
    }

    const createFeedback = "Produtos Atualizados";
    res.status(200).json(createFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: true,
      message: err instanceof Error ? err.message : "Unknown error occurred.",
    });
  }
};
