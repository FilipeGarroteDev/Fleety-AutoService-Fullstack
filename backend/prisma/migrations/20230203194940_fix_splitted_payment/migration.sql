/*
  Warnings:

  - Added the required column `isSplitted` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "isSplitted" BOOLEAN NOT NULL,
ALTER COLUMN "cardIssuer" DROP NOT NULL;
