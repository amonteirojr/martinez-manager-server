import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { firstValueFrom } from 'rxjs';
import {
  CityResponseDTO,
  IbgeSidraCityResponseDTO,
} from './dto/ibge-sidra-city-response.dto';

@Injectable()
export class IbgeSidraService {
  private readonly logger = new Logger(IbgeSidraService.name);

  constructor(private readonly httpService: HttpService) {}

  async getCityPopulationByCityId(id: number): Promise<CityResponseDTO | null> {
    try {
      const response = await firstValueFrom(this.httpService.get(`${id}`));

      if (response.status === 200) {
        const values: IbgeSidraCityResponseDTO = response.data[1];

        return {
          cityName: values.D3N.split('(')[0].trim(),
          population: parseInt(values.V, 10) || 0,
        } as CityResponseDTO;
      }
    } catch (err) {
      this.logger.error(
        `Failed to return IBGE SIDRA city population. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CITY_POPULATION,
        message: 'Failed to get CITY population',
      });
    }
  }
}
