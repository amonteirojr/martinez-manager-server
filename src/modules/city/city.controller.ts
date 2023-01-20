import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CityService } from './city.service';
import { CityPopulationResponseDTO } from './dto/city-population-response.dto copy';
import { CreateCityDTO } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiCreatedResponse({ type: City })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createCity(@Res() res: Response, @Body() createCityDTO: CreateCityDTO) {
    const city = await this.cityService.createCity(createCityDTO);
    return res.send(city);
  }

  @Get('/population/:ibgeId')
  @ApiResponse({ type: CityPopulationResponseDTO })
  @HttpCode(HttpStatus.OK)
  async getCityPopulation(
    @Res() res: Response,
    @Param('ibgeId') ibgeId: number,
  ) {
    const city = await this.cityService.getCityPopulation(ibgeId);
    return res.send(city);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCities(@Res() res: Response) {
    const cities = await this.cityService.getCities();
    return res.send(cities);
  }
}
