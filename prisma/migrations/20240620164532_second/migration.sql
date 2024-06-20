/*
  Warnings:

  - You are about to drop the column `total_bs` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `total_usd` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `owner_dni` on the `house` table. All the data in the column will be lost.
  - You are about to drop the column `owner_email` on the `house` table. All the data in the column will be lost.
  - You are about to drop the column `owner_name` on the `house` table. All the data in the column will be lost.
  - You are about to drop the column `owner_phone` on the `house` table. All the data in the column will be lost.
  - You are about to drop the column `total_bs` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `total_usd` on the `payment` table. All the data in the column will be lost.
  - Added the required column `totalBs` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalUsd` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerDni` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerEmail` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerName` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerPhone` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalBs` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalUsd` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `expense` DROP COLUMN `total_bs`,
    DROP COLUMN `total_usd`,
    ADD COLUMN `totalBs` DOUBLE NOT NULL,
    ADD COLUMN `totalUsd` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `house` DROP COLUMN `owner_dni`,
    DROP COLUMN `owner_email`,
    DROP COLUMN `owner_name`,
    DROP COLUMN `owner_phone`,
    ADD COLUMN `ownerDni` VARCHAR(191) NOT NULL,
    ADD COLUMN `ownerEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `ownerName` VARCHAR(191) NOT NULL,
    ADD COLUMN `ownerPhone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `total_bs`,
    DROP COLUMN `total_usd`,
    ADD COLUMN `totalBs` DOUBLE NOT NULL,
    ADD COLUMN `totalUsd` DOUBLE NOT NULL;
