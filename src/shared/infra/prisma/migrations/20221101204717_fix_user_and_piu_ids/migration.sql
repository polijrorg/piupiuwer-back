/*
  Warnings:

  - You are about to drop the column `piu_id` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `piu_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `pius` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,piuId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,piuId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `piuId` to the `favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `piuId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `pius` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_piu_id_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_user_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_piu_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pius" DROP CONSTRAINT "pius_user_id_fkey";

-- DropIndex
DROP INDEX "favorites_user_id_piu_id_key";

-- DropIndex
DROP INDEX "likes_user_id_piu_id_key";

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "piu_id",
DROP COLUMN "user_id",
ADD COLUMN     "piuId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "piu_id",
DROP COLUMN "user_id",
ADD COLUMN     "piuId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pius" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_piuId_key" ON "favorites"("userId", "piuId");

-- CreateIndex
CREATE UNIQUE INDEX "likes_userId_piuId_key" ON "likes"("userId", "piuId");

-- AddForeignKey
ALTER TABLE "pius" ADD CONSTRAINT "pius_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_piuId_fkey" FOREIGN KEY ("piuId") REFERENCES "pius"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_piuId_fkey" FOREIGN KEY ("piuId") REFERENCES "pius"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
