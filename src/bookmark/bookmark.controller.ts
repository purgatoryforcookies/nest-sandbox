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
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('api/bookmark')
@UseGuards(AuthGuard)
@Roles(['user'])
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getAll(@GetUser() userId: string) {
    return this.bookmarkService.getAll(userId);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.get(id);
  }

  @Post()
  create(@GetUser() id: string, @Body() dto: BookmarDto) {
    return this.bookmarkService.add(id, dto);
  }

  @Patch(':id')
  edit(@Param('id', ParseIntPipe) id: number, @Body() dto: EditBookmarkDto) {
    return this.bookmarkService.edit(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.delete(id);
  }
}
