/*
  Warnings:

  - You are about to drop the column `privilege` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'CLIENT');

-- DropIndex
DROP INDEX "Users_email_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "privilege",
ADD COLUMN     "role" "Roles" NOT NULL,
ALTER COLUMN "email" SET DEFAULT E'',
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET DEFAULT E'';

-- DropEnum
DROP TYPE "UserPrivileges";

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");
