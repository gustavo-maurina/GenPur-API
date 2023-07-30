/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty,
  all the data it contains will be lost.

*/
-- RemoveDuplicates
DELETE FROM "User"
WHERE "id" NOT IN (
  SELECT min("id") FROM "User"
  GROUP BY "email"
);

-- SaveOldData
CREATE TABLE "user_aux" as (SELECT * FROM "User");

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- TransferOldData
INSERT INTO "user"
SELECT * FROM "user_aux";

-- DeleteAuxTable
DROP TABLE "user_aux";

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
