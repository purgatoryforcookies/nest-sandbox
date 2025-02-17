-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
