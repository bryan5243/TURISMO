/*
  Warnings:

  - You are about to drop the column `creadoEn` on the `lugar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lugar` DROP COLUMN `creadoEn`;

-- CreateTable
CREATE TABLE `ImagenLugar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `lugarId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `lugarId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `lugarId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transporte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `lugarId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ImagenLugar` ADD CONSTRAINT `ImagenLugar_lugarId_fkey` FOREIGN KEY (`lugarId`) REFERENCES `Lugar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurante` ADD CONSTRAINT `Restaurante_lugarId_fkey` FOREIGN KEY (`lugarId`) REFERENCES `Lugar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_lugarId_fkey` FOREIGN KEY (`lugarId`) REFERENCES `Lugar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transporte` ADD CONSTRAINT `Transporte_lugarId_fkey` FOREIGN KEY (`lugarId`) REFERENCES `Lugar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
