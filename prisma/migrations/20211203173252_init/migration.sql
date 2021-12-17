-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "authors" TEXT[],

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;
CREATE INDEX book_content_index ON "Book" USING GIN (to_tsvector('english',"content"));
