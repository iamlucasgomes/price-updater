import upperFirst from "lodash/upperFirst";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import prisma from "~/lib/prisma";

const baseAdd = {
  Ativo: true,
  AddedDate: new Date(),
};

const baseUpdate = {
  ModifiedDate: new Date(),
};

interface CustomNextApiRequest extends NextApiRequest {
  body: ProductsType.FormValues;
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
  }
  // else if (req.method === 'PUT') {
  //   PUT(req, res);
  // } else if (req.method == 'POST') {
  //   POST(req, res);
  // }
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

// const POST = async (req: CustomNextApiRequest, res: NextApiResponse) => {
//   const body = req.body;
//   try {
//     const findByCpf = await prisma.fisicas.findFirst({
//       where: {
//         CPF: body.CPF,
//       },
//     });
//     if (findByCpf) {
//       const createFeedback = await prisma.contratacoes.create({
//         data: {
//           ModeloContrato: body.ContratacaoModeloContrato,
//           Funcao: body.ContratacaoFuncao,
//           InicioContrato: body.ContratacaoInicioContrato,
//           ValorBase: body.ContratacaoValorBase,
//           OrganizacaoId: '1',
//           AssociadoId: findByCpf.AssociadoId,
//           AddedDate: new Date(),
//           Ativo: true,
//           TermminoContrato: body.ContratacaoTermminoContrato,
//           RecebeComissao: body.ContratacaoRecebeComissao,
//           Quantidade: Number(
//             body.ContratacaoQuantidade ? body.ContratacaoQuantidade : 0,
//           ),
//         },
//       });
//       res.status(200).json(createFeedback);
//       return;
//     } else {
//       const createFeedback = await prisma.fisicas.create({
//         data: {
//           Associados: {
//             create: {
//               Contratacoes: {
//                 create: {
//                   OrganizacaoId: '1',
//                   InicioContrato: new Date(body.ContratacaoInicioContrato),
//                   TermminoContrato: body.ContratacaoTermminoContrato
//                     ? new Date(body.ContratacaoTermminoContrato)
//                     : null,
//                   ModeloContrato: body.ContratacaoModeloContrato,
//                   Funcao: body.ContratacaoFuncao,
//                   ValorBase: body.ContratacaoValorBase,
//                   SocioId: body.ContratacaoSocioId,
//                   RecebeComissao: body.ContratacaoRecebeComissao,
//                   Quantidade: Number(body.ContratacaoQuantidade),
//                   UnidadeMedidaId: body.ContratacaoUnidadeMedidaId,
//                   ...baseAdd,
//                 },
//               },
//               Contatos: {
//                 create: {
//                   Nome: body.ContatosNome,
//                   Telefone: onlyNumbers(String(body.ContatosTelefone)),
//                   ...baseAdd,
//                 },
//               },
//               Nome: body.Nome,
//               Email: body.Email,
//               DadosBancarios: {
//                 create: {
//                   Banco: body.DadosBancariosBanco,
//                   Agencia: body.DadosBancariosAgencia,
//                   Conta: body.DadosBancariosConta,
//                   Pix: body.DadosBancariosPix,
//                   ...baseAdd,
//                 },
//               },
//               Enderecos: {
//                 create: {
//                   CEP: Number(onlyNumbers(String(body.EnderecoCEP))),
//                   Logradouro: body.EnderecoLogradouro,
//                   Bairro: body?.EnderecoBairro,
//                   Cidade: body?.EnderecoCidade,
//                   Complemento: body?.EnderecoComplemento,
//                   UF: body?.EnderecoUF,
//                   Numero: body?.EnderecoNumero,
//                   Latitude: 0,
//                   Longitude: 0,
//                   ...baseAdd,
//                 },
//               },
//               TipoRelacao: 3,
//               ...baseAdd,
//             },
//           },
//           CPF: body?.CPF,
//           RG: body?.RG,
//           DataNascimento: new Date(body.DataNascimento),
//           NomeMae: body?.NomeMae,
//           EstadoCivil: body?.EstadoCivil,
//           Formacao: body?.Formacao,
//           CTPS: body?.CTPS,
//           PisPasep: body?.PisPasep,
//           ...baseAdd,
//         },
//       });

//       res.status(200).json(createFeedback);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: true,
//       message: err instanceof Error ? err.message : 'Unknown error occurred.',
//     });
//   }
// };

// const PUT = async (req: CustomNextApiRequest, res: NextApiResponse) => {
//   const body = req.body;
//   console.log(body);
//   try {
//     const createFeedback = await prisma.fisicas.update({
//       where: {
//         Id: body?.Id,
//       },
//       data: {
//         Associados: {
//           update: {
//             Contratacoes: {
//               update: {
//                 data: {
//                   OrganizacaoId: '1',
//                   InicioContrato: body?.ContratacaoInicioContrato,
//                   TermminoContrato: body?.ContratacaoTermminoContrato,
//                   ModeloContrato: body?.ContratacaoModeloContrato,
//                   Funcao: body?.ContratacaoFuncao,
//                   ValorBase: body?.ContratacaoValorBase,
//                   SocioId: body?.ContratacaoSocioId,
//                   RecebeComissao: body?.ContratacaoRecebeComissao,
//                   Quantidade: body.ContratacaoQuantidade !== ''
//                     ? Number(body?.ContratacaoQuantidade)
//                     : 0,
//                   UnidadeMedidaId: body?.ContratacaoUnidadeMedidaId,
//                   ...baseUpdate,
//                 },
//                 where: {
//                   Id: body.ContratacaoId,
//                 },
//               },
//             },
//             Contatos: {
//               update: {
//                 data: {
//                   Nome: body.ContatosNome,
//                   Telefone: onlyNumbers(String(body.ContatosTelefone)),
//                   ...baseUpdate,
//                 },
//                 where: {
//                   Id: body.ContatosId,
//                 },
//               },
//             },
//             Nome: body.Nome,
//             Email: body.Email,
//             DadosBancarios: {
//               update: {
//                 data: {
//                   Banco: body.DadosBancariosBanco,
//                   Agencia: body.DadosBancariosAgencia,
//                   Conta: body.DadosBancariosConta,
//                   Pix: body.DadosBancariosPix,
//                   ...baseUpdate,
//                 },
//                 where: {
//                   Id: body.DadosBancariosId,
//                 },
//               },
//             },
//             Enderecos: {
//               update: {
//                 CEP: Number(onlyNumbers(String(body.EnderecoCEP))),
//                 Logradouro: body.EnderecoLogradouro,
//                 Bairro: body?.EnderecoBairro,
//                 Cidade: body?.EnderecoCidade,
//                 Complemento: body?.EnderecoComplemento,
//                 UF: body?.EnderecoUF,
//                 Numero: body?.EnderecoNumero,
//                 Latitude: 0,
//                 Longitude: 0,
//                 ...baseUpdate,
//               },
//             },
//             TipoRelacao: 3,
//             ...baseUpdate,
//           },
//         },
//         CPF: body?.CPF,
//         RG: body?.RG,
//         DataNascimento: body.DataNascimento,
//         NomeMae: body?.NomeMae,
//         EstadoCivil: body?.EstadoCivil,
//         Formacao: body?.Formacao,
//         CTPS: body?.CTPS,
//         PisPasep: body?.PisPasep,
//         ...baseUpdate,
//       },
//     });

//     res.status(200).json(createFeedback);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: true,
//       message: err instanceof Error ? err.message : 'Unknown error occurred.',
//     });
//   }
// };
