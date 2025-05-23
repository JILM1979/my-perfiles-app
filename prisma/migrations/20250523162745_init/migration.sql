-- CreateTable
CREATE TABLE "PerfilG" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT
);

-- CreateTable
CREATE TABLE "PerfilL" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "perfilGId" INTEGER NOT NULL,
    CONSTRAINT "PerfilL_perfilGId_fkey" FOREIGN KEY ("perfilGId") REFERENCES "PerfilG" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ValG" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clave" TEXT NOT NULL,
    "valor" TEXT,
    "perfilGId" INTEGER NOT NULL,
    CONSTRAINT "ValG_perfilGId_fkey" FOREIGN KEY ("perfilGId") REFERENCES "PerfilG" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ValL" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clave" TEXT NOT NULL,
    "valor" TEXT,
    "perfilLId" INTEGER NOT NULL,
    CONSTRAINT "ValL_perfilLId_fkey" FOREIGN KEY ("perfilLId") REFERENCES "PerfilL" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
