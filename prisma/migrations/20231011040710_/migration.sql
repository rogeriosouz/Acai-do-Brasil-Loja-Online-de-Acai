/*
  Warnings:

  - You are about to alter the column `quant` on the `ItemCart` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemCart" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quant" INTEGER NOT NULL,
    "complementsAdd" TEXT NOT NULL,
    "cartId" TEXT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ItemCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ItemCart" ("cartId", "complementsAdd", "create_at", "id", "name", "price", "quant") SELECT "cartId", "complementsAdd", "create_at", "id", "name", "price", "quant" FROM "ItemCart";
DROP TABLE "ItemCart";
ALTER TABLE "new_ItemCart" RENAME TO "ItemCart";
CREATE UNIQUE INDEX "ItemCart_id_key" ON "ItemCart"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
