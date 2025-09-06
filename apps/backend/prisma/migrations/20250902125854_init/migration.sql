-- CreateTable
CREATE TABLE "ads" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "packageType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "checkoutSessionId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT NOT NULL DEFAULT '000000000',
    "expiresAt" DATETIME NOT NULL DEFAULT '2099-12-31 00:00:00 +00:00'
);

-- CreateTable
CREATE TABLE "ad_images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "adId" INTEGER NOT NULL,
    CONSTRAINT "ad_images_adId_fkey" FOREIGN KEY ("adId") REFERENCES "ads" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
