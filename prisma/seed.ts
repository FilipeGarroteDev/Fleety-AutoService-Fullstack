import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const foodTypes: string[] = ['foods', 'beverages'];
const foodCategories = [
  {
    name: 'Entradas',
    image:
      'https://b1861587.smushcdn.com/1861587/wp-content/themes/yootheme/cache/80/entradas-para-cardapio-restaurante-804ebbe0.jpeg?lossy=1&strip=1&webp=1',
    typeId: 1,
  },
  {
    typeId: 1,
    name: 'Lanches',
    image: 'https://www.sabornamesa.com.br/media/k2/items/cache/bf1e20a4462b71e3cc4cece2a8c96ac8_XL.jpg',
  },
  {
    typeId: 1,
    name: 'Pratos Principais',
    image: 'https://revistanews.com.br/wp-content/uploads/2018/05/Prato-principal-DtypeIdge-Steakhouse-Pub.jpg',
  },
  {
    typeId: 1,
    name: 'Sobremesas',
    image: 'https://cdn.abrahao.com.br/base/fa1/4db/4d8/tipos-sobremesa-para-vender.jpg',
  },
];
const beveragesCategories = [
  {
    typeId: 2,
    name: 'Não Alcoólicos',
    image:
        'https://tudorondonia.com/uploads/11-12-20-c5rh6shqd80e006.jpg',
  },
  {
    typeId: 2,
    name: 'Cervejas',
    image: 'https://content.paodeacucar.com/wp-content/uploads/2017/03/tipos-de-cerveja-vienna.jpg',
  },
  {
    typeId: 2,
    name: 'Drinks da Casa',
    image: 'https://www.receiteria.com.br/wp-content/uploads/receitas-de-drinks-faceis-0.jpg',
  },
  {
    typeId: 2,
    name: 'Carta de Vinhos',
    image:
        'https://ichef.bbci.co.uk/news/640/cpsprodpb/3E8F/production/_127251061_c2018252-e442-4ee1-905e-9f55c6deb967.jpg',
  },
]

async function mainSeed() {
  //creating product types (id 1: foods, id 2: beverages)
  let hasTypes: boolean = false;

  for (let i = 0; i < foodTypes.length; i++) {
    const type = await prisma.productTypes.findFirst({
      where: {
        name: foodTypes[i],
      },
    });
    if (type) hasTypes = true;
  }

  if (!hasTypes) {
    foodTypes.forEach(async (type) => {
      await prisma.productTypes.create({
        data: {
          name: type,
        },
      });
    });
  }

  //creating foods categories
  let hasFoodCategory: boolean = false;

  for (let i = 0; i < foodCategories.length; i++) {
    const category = await prisma.productCategories.findFirst({
      where: {
        name: foodCategories[i].name,
      },
    });
    if (category) hasFoodCategory = true;
  }

  if (!hasFoodCategory) {
    foodCategories.forEach(async (category) => {
      await prisma.productCategories.create({
        data: {
          name: category.name,
          image: category.image,
          typeId: category.typeId,
        },
      });
    });
  }

  //creating beverages categories
  let hasBeveragesCategory: boolean = false;

  for (let i = 0; i < beveragesCategories.length; i++) {
    const category = await prisma.productCategories.findFirst({
      where: {
        name: beveragesCategories[i].name,
      },
    });
    if (category) hasBeveragesCategory = true;
  }

  if (!hasBeveragesCategory) {
    beveragesCategories.forEach(async (category) => {
      await prisma.productCategories.create({
        data: {
          name: category.name,
          image: category.image,
          typeId: category.typeId,
        },
      });
    });
  }
}

mainSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
