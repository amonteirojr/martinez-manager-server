import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { CNPJFormatter, formatDateToLocaleString } from 'src/shared/formatters';

import { FindOptionsWhere, Raw, Repository } from 'typeorm';
import { CityService } from '../city/city.service';
import { City } from '../city/entities/city.entity';

import { CreateCustomerDTO } from './dto/create-customer.dto';
import { CustomerResponseDTO } from './dto/customer-response.dto';
import { Customer } from './entities/customer.entity';
import * as PDFPrinter from 'pdfmake';
import { pdfMakeFonts } from 'src/shared/pdfMakeFonts';
import { launch } from 'puppeteer';
import { generateHtmlFromTemplate } from 'src/shared/report-functions';
import { pdfOptions } from 'src/shared/pdfStructure';
import { toLocalDate } from 'src/shared/localDateFormatter';
import { CustomerFiltersDTO } from './dto/customer-filters.dto';

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
        customerSince: data.customerSince,
        aditionalInfo: data.aditionalInfo,
        phoneNumber: data.phoneNumber,
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
        phoneNumber: data.phoneNumber,
        customerSince: data.customerSince,
        aditionalInfo: data.aditionalInfo,
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

  async getAllCustomers(
    filters?: CustomerFiltersDTO,
  ): Promise<CustomerResponseDTO[]> {
    try {
      let where: FindOptionsWhere<Customer>;

      if (filters.customerName && filters.customerName.length > 0) {
        where = {
          ...where,
          customerName: filters.customerName,
        };
      }

      if (filters.document && filters.document.length > 0) {
        where = {
          ...where,
          document: filters.document,
        };
      }

      if (filters.typeId && filters.typeId.length > 0) {
        where = {
          ...where,
          typeId: parseInt(filters.typeId),
        };
      }

      if (filters.cityId && filters.cityId.length > 0) {
        where = {
          ...where,
          cityId: parseInt(filters.cityId),
        };
      }

      if (filters && filters.hasContract) {
        where = {
          ...where,
          contracts: true,
        };
      }

      const customers = await this.customerRepository.find({
        where,
        relations: { customerType: true, city: true },
        order: {
          customerId: 'ASC',
        },
      });

      const response = customers.map(
        (customer) =>
          ({
            ...customer,
            typeName: customer.customerType.name,
            cityPopulation: customer.city.cityPopulation,
            cityName: customer.city.cityName,
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

  async getAllCustomersWithContract(): Promise<CustomerResponseDTO[]> {
    try {
      const customers = await this.customerRepository.find({
        relations: { customerType: true, city: true, contracts: true },
        where: {
          contracts: {},
        },
        order: {
          customerId: 'ASC',
        },
      });

      const response = customers.map(
        (customer) =>
          ({
            ...customer,
            typeName: customer.customerType.name,
            cityPopulation: customer.city.cityPopulation,
            cityName: customer.city.cityName,
          } as CustomerResponseDTO),
      );

      return response;
    } catch (err) {
      this.logger.error(
        `Failed to get customers with contracts. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CUSTOMER,
        message: `Failed to customers`,
      });
    }
  }

  async getCustomer(customerId: number): Promise<CustomerResponseDTO> {
    try {
      const customer = await this.customerRepository.findOne({
        where: { customerId },
        relations: {
          city: true,
          customerType: true,
        },
      });

      return {
        ...customer,
        typeName: customer.customerType.name,
        cityPopulation: customer.city.cityPopulation,
        cityName: customer.city.cityName,
      } as CustomerResponseDTO;
    } catch (err) {
      this.logger.error(`Failed to get customer. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CUSTOMER,
        message: `Failed to customer`,
      });
    }
  }

  async printCustomerList(filters?: CustomerFiltersDTO): Promise<Buffer> {
    try {
      const browser = await launch({ headless: true });
      const page = await browser.newPage();
      const customers = await this.getAllCustomers(filters);

      const reportData = customers.map((customer) => ({
        ...customer,
        customerSince: toLocalDate(customer.customerSince),
        document: CNPJFormatter(customer.document),
      }));

      const html = await generateHtmlFromTemplate(
        { customers: reportData },
        'customer-list.ejs',
      );

      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdf = await page.pdf({
        ...pdfOptions(),
      });

      await browser.close();

      return pdf;
    } catch (err) {
      this.logger.error(`Failed generate Customer list report. Cause: ${err}`);
      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GENERATE_HTML_FROM_EJS,
        message: err.message,
      });
    }
  }
}
