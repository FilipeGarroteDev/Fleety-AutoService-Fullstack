/*
  Warnings:

  - Added the required column `amount` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "amount" INTEGER NOT NULL,
ALTER COLUMN "optionals" SET DEFAULT E'';
