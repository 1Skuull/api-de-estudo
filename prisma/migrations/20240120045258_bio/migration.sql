/*
  Warnings:

  - The primary key for the `bio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bio` on the `bio` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `bio` table. All the data in the column will be lost.
  - Added the required column `text` to the `Bio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bio` DROP PRIMARY KEY,
    DROP COLUMN `bio`,
    DROP COLUMN `id`,
    ADD COLUMN `text` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `comments` ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `posts` ADD COLUMN `image` VARCHAR(191) NULL;
