/*
  Warnings:

  - The primary key for the `favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the `Piu` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,piu_id]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Piu" DROP CONSTRAINT "Piu_user_id_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_piu_id_fkey";

-- AlterTable
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_pkey",
DROP COLUMN "id";

-- DropTable
DROP TABLE "Piu";

-- CreateTable
CREATE TABLE "pius" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "pius_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "user_id" TEXT NOT NULL,
    "piu_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_piu_id_key" ON "likes"("user_id", "piu_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_piu_id_key" ON "favorites"("user_id", "piu_id");

-- AddForeignKey
ALTER TABLE "pius" ADD CONSTRAINT "pius_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_piu_id_fkey" FOREIGN KEY ("piu_id") REFERENCES "pius"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_piu_id_fkey" FOREIGN KEY ("piu_id") REFERENCES "pius"("id") ON DELETE CASCADE ON UPDATE CASCADE;
