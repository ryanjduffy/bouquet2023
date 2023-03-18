/*
  Warnings:

  - The `date` column on the `bouquet2023` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "bouquet2023" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3);
