import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IbgeStatesResponseDTO } from './dto/ibge-states-response.dto';
import { HttpService } from '@nestjs/axios';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { firstValueFrom } from 'rxjs';
import { IbgeCityResponseDTO } from './dto/ibge-citiy-response.dto';
import { CitiesIbgeResponseDTO } from '../city/dto/cities-ibge-response.dto';

@Injectable()
export class IbgeService {
  private readonly logger = new Logger(IbgeService.name);

  constructor(private readonly httpService: HttpService) {}

  async getAllStates(): Promise<IbgeStatesResponseDTO | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/estados?orderBy=nome'),
      );

      return response.data || null;
    } catch (err) {
      this.logger.error(`Failed to return IBGE states. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_IBGE_STATES,
        message: 'Failed to get all systems',
      });
    }
  }

  async getCitiesByStateFromIbge(
    state: string,
  ): Promise<CitiesIbgeResponseDTO[] | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/estados/${state}/municipios?orderBy=nome`),
      );

      const result = response.data.map((d: CitiesIbgeResponseDTO) => ({
        id: d.id,
        name: d.nome,
      }));

      return result;
    } catch (err) {
      this.logger.error(
        `Failed to return IBGE cities from ${state}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_IBGE_CITIES,
        message: 'Failed to get cities from IBGE',
      });
    }
  }

  async getCityById(id: number): Promise<IbgeCityResponseDTO | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/municipios/${id}`),
      );

      return response.data || null;
    } catch (err) {
      this.logger.error(`Failed to return IBGE states. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_IBGE_STATES,
        message: 'Failed to get all systems',
      });
    }
  }
}
