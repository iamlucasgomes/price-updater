import { Prisma } from '@prisma/client';

export const products: Prisma.ProductUncheckedCreateInput[] = [
  {
    code: 16,
    name: 'AZEITE  PORTUGUÉS  EXTRA VIRGEM GALLO 500ML',
    costPrice: 18.44,
    salesPrice: 20.49,
  },
  {
    code: 18,
    name: 'BEBIDA ENERGÉTICA VIBE 2L',
    costPrice: 8.09,
    salesPrice: 8.99,
  },
  {
    code: 19,
    name: 'ENERGÉTICO  RED BULL ENERGY DRINK 250ML',
    costPrice: 6.56,
    salesPrice: 7.29,
  },
  {
    code: 20,
    name: 'ENERGÉTICO RED BULL ENERGY DRINK 355ML',
    costPrice: 9.71,
    salesPrice: 10.79,
  },
  {
    code: 21,
    name: 'BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML',
    costPrice: 10.71,
    salesPrice: 11.71,
  },
  {
    code: 22,
    name: 'ENERGÉTICO  RED BULL ENERGY DRINK SEM AÇÚCAR 250ML',
    costPrice: 6.74,
    salesPrice: 7.49,
  },
  {
    code: 23,
    name: 'ÁGUA MINERAL BONAFONT SEM GÁS 1,5L',
    costPrice: 2.15,
    salesPrice: 2.39,
  },
  {
    code: 24,
    name: 'FILME DE PVC WYDA 28CMX15M',
    costPrice: 3.59,
    salesPrice: 3.99,
  },
  {
    code: 26,
    name: 'ROLO DE PAPEL ALUMÚNIO WYDA 30CMX7,5M',
    costPrice: 5.21,
    salesPrice: 5.79,
  },
  {
    code: 1000,
    name: 'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES',
    costPrice: 48.54,
    salesPrice: 53.94,
  },
  {
    code: 1010,
    name: 'KIT ROLO DE ALUMINIO + FILME PVC WYDA',
    costPrice: 8.8,
    salesPrice: 9.78,
  },
  {
    code: 1020,
    name: 'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',
    costPrice: 51.81,
    salesPrice: 57.0,
  },
];
