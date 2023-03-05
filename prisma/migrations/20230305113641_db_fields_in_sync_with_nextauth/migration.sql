/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `avatarUrl`,
    ADD COLUMN `emailVerified` DATETIME(3) NULL,
    ADD COLUMN `image` VARCHAR(255) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL;
