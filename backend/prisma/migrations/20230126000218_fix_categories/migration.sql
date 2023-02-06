/*
  Warnings:

  - You are about to drop the column `typeId` on the `Products` table. All the data in the column will be lost.
  - Added the required column `image` to the `ProductCategories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `ProductCategories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_typeId_fkey";

-- AlterTable
ALTER TABLE "ProductCategories" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "typeId";

-- AddForeignKey
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ProductTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
