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
import { JwtGuard } from 'src/auth/guard';
import { BookmarDto, EditBookmarkDto } from './dto';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  async getAll() {
    return await this.bookmarkService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.get(id);
  }

  @Post()
  async create(@GetUser('id') id: number, @Body() dto: BookmarDto) {
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
