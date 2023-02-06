import { PrismaClient } from '@prisma/client';
import { beveragesCategories, foodCategories, foodTypes, optionals, productsList } from './entitiesContainer';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';


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
    for (let i = 0; i < foodTypes.length; i++) {
      await prisma.productTypes.create({
        data: {
          name: foodTypes[i],
        },
      });
    }
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
    for (let i = 0; i < foodCategories.length; i++) {
      await prisma.productCategories.create({
        data: {
          name: foodCategories[i].name,
          image: foodCategories[i].image,
          typeId: foodCategories[i].typeId,
        },
      });
    }
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
    for (let i = 0; i < beveragesCategories.length; i++) {
      const category = await prisma.productCategories.create({
        data: {
          name: beveragesCategories[i].name,
          image: beveragesCategories[i].image,
          typeId: beveragesCategories[i].typeId,
        },
      });
      if (category) hasBeveragesCategory = true;
    }
  }

  //creating optionals
  let hasOptionals: boolean = false;

  for (let i = 0; i < optionals.length; i++) {
    const findOptional = await prisma.optionals.findFirst({
      where: {
        name: optionals[i].name,
      },
    });
    if (findOptional) hasOptionals = true;
  }

  if (!hasOptionals) {
    for (let i = 0; i < optionals.length; i++) {
      await prisma.optionals.create({
        data: {
          name: optionals[i].name,
          value: optionals[i].value,
        },
      });
    }
  }

  //creating optionals_categories
  const hasOptionalsCategory = await prisma.optionals_Category.findMany({});

  if (hasOptionalsCategory.length === 0) {
    await prisma.optionals_Category.createMany({
      data: [
        { optionalId: 1, categoryId: 1 },
        { optionalId: 2, categoryId: 1 },
        { optionalId: 3, categoryId: 1 },
        { optionalId: 5, categoryId: 1 },
        { optionalId: 4, categoryId: 2 },
        { optionalId: 5, categoryId: 2 },
        { optionalId: 9, categoryId: 2 },
        { optionalId: 10, categoryId: 2 },
        { optionalId: 4, categoryId: 3 },
        { optionalId: 5, categoryId: 3 },
        { optionalId: 6, categoryId: 3 },
        { optionalId: 7, categoryId: 3 },
        { optionalId: 8, categoryId: 3 },
        { optionalId: 11, categoryId: 4 },
        { optionalId: 12, categoryId: 4 },
        { optionalId: 13, categoryId: 4 },
        { optionalId: 14, categoryId: 5 },
        { optionalId: 14, categoryId: 6 },
        { optionalId: 14, categoryId: 7 },
        { optionalId: 14, categoryId: 8 },
      ],
    });
  }

  //creating products
  const hasProducts = await prisma.products.findMany({});

  if (hasProducts.length === 0) {
    productsList.forEach(async (product) => {
      await prisma.products.create({
        data: {
          name: product.name,
          description: product.description,
          value: product.value,
          categoryId: product.categoryId,
          image: product.image,
        },
      });
    });
  }

  //creating admin (name: test, pass: test)
  const hasAdmin = await prisma.users.findUnique({
    where: {
      name: 'test',
    },
  });

  if (!hasAdmin) {
    const password = bcrypt.hashSync("test", 10);
    await prisma.users.create({
      data: {
        name: "test",
        email: "admin@test.com",
        password,
        role: 'ADMIN',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_IBtRpItnMqL7irvC06TiixZnmZjPL1Eeue2Fxv0xg6jYpf9GA-ipdmW2Y58bv326KC8&usqp=CAU",
      },
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
