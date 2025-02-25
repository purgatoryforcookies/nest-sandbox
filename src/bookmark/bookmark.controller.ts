import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarDto, EditBookmarkDto } from './dto';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { LoginGuard } from 'src/auth/guard/login.guard';

@Controller('api/bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  async getAll(@GetUser('sub') userId: string) {
    return await this.bookmarkService.getAll(userId);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.get(id);
  }

  @Post()
  async create(@GetUser('sub') id: string, @Body() dto: BookmarDto) {
    return this.bookmarkService.add(id, dto);
  }

  @Patch(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.edit(id, dto);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.delete(id);
  }
}
