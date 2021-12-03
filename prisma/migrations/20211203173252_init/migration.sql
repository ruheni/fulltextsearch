-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "authors" TEXT[],

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
