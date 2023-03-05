-- AlterTable
ALTER TABLE `account` ADD COLUMN `oauth_token` VARCHAR(191) NULL,
    ADD COLUMN `oauth_token_secret` VARCHAR(191) NULL;
