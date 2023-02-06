-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "optionals" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ratings" ALTER COLUMN "userNote" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;
