import { Injectable, NotFoundException } from '@nestjs/common';
import { DaoService } from 'src/dao/dao.service';
import { BookmarDto, EditBookmarkDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const PRISMA_NOT_FOUND_CODE = 'P2025';

@Injectable()
export class BookmarkService {
  constructor(private dao: DaoService) {}

  async getAll() {
    return this.dao.bookmark.findMany();
  }

  async get(id: number) {
    const bookmark = await this.dao.bookmark.findFirst({
      where: {
        id: id,
      },
    });

    if (!bookmark) {
      throw new NotFoundException();
    }

    return bookmark;
  }

  add(userId: number, dto: BookmarDto) {
    return this.dao.bookmark.create({
      data: {
        ...dto,
        user_id: userId,
      },
    });
  }

  async edit(id: number, dto: EditBookmarkDto) {
    const result = await this.dao.bookmark.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });

    return result;
  }

  async delete(id: number) {
    try {
      await this.dao.bookmark.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_NOT_FOUND_CODE) {
          throw new NotFoundException();
        }
      }
      throw error;
    }
  }
}
