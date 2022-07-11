import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { IbgeSidraService } from '../ibge-sidra/ibge-sidra.service';
import { IbgeService } from '../ibge/ibge.service';
import { CityPopulationResponseDTO } from './dto/city-population-response.dto';
import { CreateCityDTO } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  private readonly logger = new Logger(CityService.name);

  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    private readonly ibgeService: IbgeService,
    private readonly sidraService: IbgeSidraService,
  ) {}

  async createCity(createCityDTO: CreateCityDTO): Promise<City> {
    try {
      return await this.cityRepository.create(createCityDTO).save();
    } catch (err) {
      this.logger.error(
        `Failed to create city ${createCityDTO.cityName}. Cause: ${err}`,
      );

      if (err.code === '23505') {
        throw new ConflictException({
          code: CodeErrors.CITY_ALREADY_EXISTS,
          message: `City ${createCityDTO.cityName} already exists`,
        });
      }

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_CITY,
        message: `Failed to create city ${createCityDTO.cityName}`,
      });
    }
  }

  async createCityWithIbgeData(
    ibgeId: number,
    cityPopulation: number,
  ): Promise<City> {
    try {
      const ibgeCityData = await this.ibgeService.getCityById(ibgeId);

      if (!ibgeCityData) {
        this.logger.error(`City IBGE id ${ibgeId} wasn't found in IBGE api`);

        throw new InternalServerErrorException({
          code: CodeErrors.FAIL_TO_FIND_CITY_BY_IBGE_ID,
          message: `Failed to find city`,
        });
      }

      if (!cityPopulation || cityPopulation === 0) {
        const result = await this.sidraService.getCityPopulationByCityId(
          ibgeId,
        );
        cityPopulation = result.population;
      }

      if (!cityPopulation) {
        this.logger.error(
          `City IBGE id ${ibgeId} wasn't found in IBGE SIDRA api`,
        );

        throw new InternalServerErrorException({
          code: CodeErrors.FAIL_TO_FIND_CITY_BY_IBGE_ID,
          message: `Failed to find city`,
        });
      }

      const newCity: CreateCityDTO = {
        cityName: ibgeCityData.nome,
        ibgeCode: ibgeCityData.id,
        state: ibgeCityData.microrregiao.mesorregiao.UF.sigla,
        cityPopulation,
      };

      return await this.cityRepository.create(newCity).save();
    } catch (err) {
      this.logger.error(`Failed to create city ${ibgeId}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_CITY,
        message: `Failed to create city ${ibgeId}`,
      });
    }
  }

  async getCityByIbgeId(ibgeId: number): Promise<City> {
    try {
      return await this.cityRepository.findOne({ where: { ibgeCode: ibgeId } });
    } catch (err) {
      this.logger.error(
        `Failed to find city with ibge id ${ibgeId}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_CITY_BY_IBGE_ID,
        message: `Failed to find city with ibge id ${ibgeId}`,
      });
    }
  }

  async getCityPopulation(ibgeId: number): Promise<CityPopulationResponseDTO> {
    try {
      const { population: cityPopulation } =
        await this.sidraService.getCityPopulationByCityId(ibgeId);

      return {
        cityPopulation: cityPopulation || 0,
      } as CityPopulationResponseDTO;
    } catch (err) {
      this.logger.error(
        `Failed to get city ${ibgeId} population. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CITY_POPULATION,
        message: `Failed to get city population`,
      });
    }
  }
}
