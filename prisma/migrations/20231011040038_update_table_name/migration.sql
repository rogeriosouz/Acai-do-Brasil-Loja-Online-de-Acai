/*
  Warnings:

  - You are about to drop the column `title` on the `ItemCart` table. All the data in the column will be lost.
  - Added the required column `name` to the `ItemCart` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemCart" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quant" TEXT NOT NULL,
    "complementsAdd" TEXT NOT NULL,
    "cartId" TEXT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ItemCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ItemCart" ("cartId", "complementsAdd", "create_at", "id", "price", "quant") SELECT "cartId", "complementsAdd", "create_at", "id", "price", "quant" FROM "ItemCart";
DROP TABLE "ItemCart";
ALTER TABLE "new_ItemCart" RENAME TO "ItemCart";
CREATE UNIQUE INDEX "ItemCart_id_key" ON "ItemCart"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
