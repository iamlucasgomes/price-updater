import prisma from "~/lib/prisma";

export default async function productExists(productCode: number) {
  const product = await prisma.product.findUnique({
    where: {
      code: productCode,
    },
  });
  if (product) {
    return product;
  }

  return false;
}
