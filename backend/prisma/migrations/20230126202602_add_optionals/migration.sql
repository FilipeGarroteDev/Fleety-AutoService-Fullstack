-- CreateTable
CREATE TABLE "Optionals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Optionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Optionals_Category" (
    "id" SERIAL NOT NULL,
    "optionalId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Optionals_Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Optionals_name_key" ON "Optionals"("name");

-- AddForeignKey
ALTER TABLE "Optionals_Category" ADD CONSTRAINT "Optionals_Category_optionalId_fkey" FOREIGN KEY ("optionalId") REFERENCES "Optionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Optionals_Category" ADD CONSTRAINT "Optionals_Category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
