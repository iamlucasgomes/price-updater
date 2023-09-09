import { PrismaClient } from "@prisma/client";

import { packs } from "./Data/packs";
import { products } from "./Data/products";
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    products.map(async (product) => {
      await prisma.product.upsert({
        where: { code: product.code },
        update: {},
        create: product,
      });
    })
  );

  await Promise.all(
    packs.map(async (pack) => {
      await prisma.pack.upsert({
        where: { id: pack.id },
        update: {},
        create: {
          pack: {
            connect: { code: pack.packId },
          },
          product: {
            connect: { code: pack.productId },
          },
          qty: pack.qty,
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
