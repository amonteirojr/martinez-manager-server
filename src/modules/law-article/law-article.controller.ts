import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LawArticleService } from './law-article.service';
import { CreateLawArticleDto } from './dto/create-law-article.dto';
import { UpdateLawArticleDto } from './dto/update-law-article.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('law-article')
export class LawArticleController {
  constructor(private readonly lawArticleService: LawArticleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createLawArticleDto: CreateLawArticleDto) {
    return this.lawArticleService.create(createLawArticleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.lawArticleService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.lawArticleService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() updateLawArticleDto: UpdateLawArticleDto,
  ) {
    return this.lawArticleService.update(+id, updateLawArticleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.lawArticleService.remove(+id);
  }
}
