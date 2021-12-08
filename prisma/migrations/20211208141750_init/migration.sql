-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "release" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

CREATE EXTENSION pg_trgm;

CREATE EXTENSION btree_gin;

-- Create Index on description

CREATE INDEX film_description_index ON "Film" USING GIN("description")