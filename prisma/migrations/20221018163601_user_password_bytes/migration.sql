/*
  Warnings:

  - Changed the type of `hashed_password` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `salt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashed_password",
ADD COLUMN     "hashed_password" BYTEA NOT NULL,
DROP COLUMN "salt",
ADD COLUMN     "salt" BYTEA NOT NULL;
