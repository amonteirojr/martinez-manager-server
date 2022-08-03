import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { CityService } from '../city/city.service';
import { City } from '../city/entities/city.entity';

import { CreateCustomerDTO } from './dto/create-customer.dto';
import { CustomerResponseDTO } from './dto/customer-response.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly cityService: CityService,
  ) {}

  async createCustomer(data: CreateCustomerDTO): Promise<Customer> {
    try {
      const createdCity = await this.cityService.createCityWithIbgeData(
        data.cityId,
        data.cityPopulation,
      );

      const newCustomer: Partial<Customer> = {
        cityId: createdCity.cityId,
        customerName: data.customerName,
        typeId: data.customerTypeId,
        document: data.document,
        address: data.address,
        complement: data.complement,
        neighborhood: data.neighborhood,
        number: data.number,
        referenceContactName: data.referenceContactName,
        referenceContactPhone: data.referenceContactPhone,
        zipCode: data.zipCode,
      };

      return await this.customerRepository.create(newCustomer).save();
    } catch (err) {
      this.logger.error(
        `Failed to create customer ${data.customerName}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: err.code || CodeErrors.FAIL_TO_CREATE_CUSTOMER,
        message:
          err.message || `Failed to create customer ${data.customerName}`,
      });
    }
  }

  async updateCustomer(
    customerId: number,
    data: CreateCustomerDTO,
  ): Promise<void> {
    try {
      const existingCity = await this.cityService.getCityByIbgeId(data.cityId);
      let createdCity: City;

      if (!existingCity) {
        createdCity = await this.cityService.createCityWithIbgeData(
          data.cityId,
          data.cityPopulation,
        );
      }

      const updateCustomer: Partial<Customer> = {
        cityId: existingCity?.cityId || createdCity.cityId,
        customerName: data.customerName,
        typeId: data.customerTypeId,
        document: data.document,
        address: data.address,
        complement: data.complement,
        neighborhood: data.neighborhood,
        number: data.number,
        referenceContactName: data.referenceContactName,
        referenceContactPhone: data.referenceContactPhone,
        zipCode: data.zipCode,
      };

      await this.customerRepository.update({ customerId }, updateCustomer);

      return;
    } catch (err) {
      this.logger.error(
        `Failed to create customer ${data.customerName}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: err.code || CodeErrors.FAIL_TO_CREATE_CUSTOMER,
        message:
          err.message || `Failed to create customer ${data.customerName}`,
      });
    }
  }

  async getAllCustomers(): Promise<CustomerResponseDTO[]> {
    try {
      const customers = await this.customerRepository.find({
        relations: { customerType: true, city: true },
        order: {
          customerId: 'ASC',
        },
      });

      const response = customers.map(
        (customer) =>
          ({
            customerName: customer.customerName,
            address: customer.address,
            cityId: customer.cityId,
            typeId: customer.typeId,
            document: customer.document,
            neighborhood: customer.neighborhood,
            number: customer.number,
            zipCode: customer.zipCode,
            cityPopulation: customer.city.cityPopulation,
            complement: customer.complement,
            referenceContactName: customer.referenceContactName,
            cityName: customer.city.cityName,
            customerId: customer.customerId,
            referenceContactPhone: customer.referenceContactPhone,
            typeName: customer.customerType.name,
            customerType: customer.customerType,
            city: customer.city,
          } as CustomerResponseDTO),
      );

      return response;
    } catch (err) {
      this.logger.error(`Failed to get customers. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CUSTOMER,
        message: `Failed to customers`,
      });
    }
  }
}
