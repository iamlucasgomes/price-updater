-- CreateTable
CREATE TABLE `Product` (
    `code` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `costPrice` DECIMAL(9, 2) NOT NULL,
    `salesPrice` DECIMAL(9, 2) NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,

    INDEX `Pack_productId_idx`(`productId`),
    INDEX `Pack_packId_idx`(`packId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
