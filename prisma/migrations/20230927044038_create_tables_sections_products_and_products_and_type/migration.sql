-- CreateTable
CREATE TABLE "SectionsProducts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "sectionsProductsId" TEXT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Products_sectionsProductsId_fkey" FOREIGN KEY ("sectionsProductsId") REFERENCES "SectionsProducts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SectionsTypesProduct" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "maximumQuantity" INTEGER NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sectionsTypesProductId" TEXT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Type_sectionsTypesProductId_fkey" FOREIGN KEY ("sectionsTypesProductId") REFERENCES "SectionsTypesProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionsProducts_id_key" ON "SectionsProducts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Products_id_key" ON "Products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SectionsTypesProduct_id_key" ON "SectionsTypesProduct"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Type_id_key" ON "Type"("id");
