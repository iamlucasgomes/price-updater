import { Prisma } from '@prisma/client';

export const packs: Prisma.PackUncheckedCreateInput[] = [
  {
    id: 1,
    packId: 1000,
    productId: 18,
    qty: 6,
  },
  {
    id: 2,
    packId: 1010,
    productId: 24,
    qty: 2,
  },
  {
    id: 3,
    packId: 1010,
    productId: 26,
    qty: 1,
  },
  {
    id: 4,
    packId: 1020,
    productId: 19,
    qty: 3,
  },
  {
    id: 5,
    packId: 1020,
    productId: 21,
    qty: 3,
  },
];
