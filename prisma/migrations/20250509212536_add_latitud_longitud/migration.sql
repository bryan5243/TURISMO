/*
  Warnings:

  - You are about to drop the column `creadoEn` on the `categoria` table. All the data in the column will be lost.
  - Made the column `icono` on table `categoria` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `latitud` to the `Lugar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitud` to the `Lugar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `creadoEn`,
    MODIFY `icono` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `lugar` ADD COLUMN `latitud` DOUBLE NOT NULL,
    ADD COLUMN `longitud` DOUBLE NOT NULL;
