-- CreateTable
CREATE TABLE "ItemCart" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "quant" TEXT NOT NULL,
    "complementsAdd" TEXT NOT NULL,
    "cartId" TEXT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ItemCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "idUserBrowser" TEXT NOT NULL PRIMARY KEY,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemCart_id_key" ON "ItemCart"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_id_key" ON "Cart"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_idUserBrowser_key" ON "Cart"("idUserBrowser");
