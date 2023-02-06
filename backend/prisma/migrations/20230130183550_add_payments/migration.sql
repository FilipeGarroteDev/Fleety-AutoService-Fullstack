-- CreateEnum
CREATE TYPE "Issuers" AS ENUM ('MASTERCARD', 'VISA');

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "totalValue" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "cardIssuer" "Issuers" NOT NULL,
    "cardLastDigits" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
