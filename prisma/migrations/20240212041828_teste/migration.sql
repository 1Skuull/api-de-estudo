/*
  Warnings:

  - You are about to drop the column `authorId` on the `bio` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Bio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Bio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bio` DROP FOREIGN KEY `Bio_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_authorId_fkey`;

-- AlterTable
ALTER TABLE `bio` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `likes` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Bio_userId_key` ON `Bio`(`userId`);

-- AddForeignKey
ALTER TABLE `Bio` ADD CONSTRAINT `Bio_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
