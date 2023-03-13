-- CreateTable
CREATE TABLE "Fuck" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,

    CONSTRAINT "Fuck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fuck" ADD CONSTRAINT "Fuck_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
