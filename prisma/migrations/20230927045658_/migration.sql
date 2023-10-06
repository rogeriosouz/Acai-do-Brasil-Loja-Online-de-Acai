/*
  Warnings:

  - You are about to alter the column `price` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "sectionsProductsId" TEXT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Products_sectionsProductsId_fkey" FOREIGN KEY ("sectionsProductsId") REFERENCES "SectionsProducts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("create_at", "id", "imageUrl", "name", "price", "sectionsProductsId") SELECT "create_at", "id", "imageUrl", "name", "price", "sectionsProductsId" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE UNIQUE INDEX "Products_id_key" ON "Products"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
