-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SectionsTypesProduct" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "maximumQuantity" INTEGER NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productsId" TEXT,
    CONSTRAINT "SectionsTypesProduct_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SectionsTypesProduct" ("create_at", "id", "maximumQuantity", "title") SELECT "create_at", "id", "maximumQuantity", "title" FROM "SectionsTypesProduct";
DROP TABLE "SectionsTypesProduct";
ALTER TABLE "new_SectionsTypesProduct" RENAME TO "SectionsTypesProduct";
CREATE UNIQUE INDEX "SectionsTypesProduct_id_key" ON "SectionsTypesProduct"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
