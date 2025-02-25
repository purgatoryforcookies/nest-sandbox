import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { DaoService } from 'src/dao/dao.service';
import { BookmarDto, EditBookmarkDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginGuard } from 'src/auth/guard/login.guard';

const PRISMA_NOT_FOUND_CODE = 'P2025';

@Injectable()
@UseGuards(LoginGuard)
export class BookmarkService {
  constructor(private dao: DaoService) {}

  async getAll(id: string) {
    return this.dao.bookmark.findMany({
      where: {
        user_id: id,
      },
    });
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

  add(userId: string, dto: BookmarDto) {
    return this.dao.bookmark.create({
      data: {
        ...dto,
        user_id: userId,
      },
    });
  }

  async edit(id: number, dto: EditBookmarkDto) {
    try {
      const result = await this.dao.bookmark.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
        },
      });

      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_NOT_FOUND_CODE) {
          throw new NotFoundException();
        }
      }
      throw error;
    }
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

  /**
   * Adds a few example bookmarks for new users
   */
  boilerplate(userId: string) {
    return this.dao.bookmark.createMany({
      data: [
        {
          title: 'Example bookmark',
          link: 'https://google.com',
          user_id: userId,
        },
        {
          title: 'Example bookmark',
          link: 'https://yahoo.com',
          user_id: userId,
        },
        {
          title: 'Example bookmark',
          link: 'https://youtube.com',
          user_id: userId,
        },
      ],
    });
  }
}
