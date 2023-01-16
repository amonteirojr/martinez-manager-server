import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceStatusEnum } from 'src/enums/InvoiceStatus';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { FindOptionsWhere, Raw, Repository } from 'typeorm';
import { Contract } from '../contract/entitites/contract.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceFiltersDTO } from './dto/invoice-filters.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    try {
      return await this.invoiceRepository.create(createInvoiceDto).save();
    } catch (err) {
      this.logger.error(`Failed to create invoice. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_INVOICE,
        message: 'Fail to create invoice',
      });
    }
  }

  async findAll(filters?: InvoiceFiltersDTO): Promise<Invoice[]> {
    try {
      let where: FindOptionsWhere<Invoice>;

      if (filters?.contractId) {
        where = {
          ...where,
          contractId: parseInt(filters.contractId),
        };
      }

      if (filters?.status) {
        where = {
          ...where,
          status: filters.status,
        };
      }

      if (filters?.customerId) {
        where = {
          ...where,
          contract: {
            customerId: parseInt(filters.customerId),
          },
        };
      }

      if (filters?.invoiceDate) {
        where = {
          ...where,
          invoiceDate: Raw(
            () => `"Invoice"."invoiceDate"::date = '${filters.invoiceDate}'`,
          ),
        };
      }

      if (filters?.invoiceNumber) {
        where = {
          ...where,
          invoiceNumber: filters.invoiceNumber,
        };
      }

      if (filters?.isPaid === 'true') {
        where = {
          ...where,
          paymentDate: Raw((alias) => `${alias} is not null`),
          status: InvoiceStatusEnum.PAID,
        };
      }

      if (filters?.value) {
        where = {
          ...where,
          value: filters.value,
        };
      }

      const result = await this.invoiceRepository.find({
        where,
        relations: {
          contract: {
            customer: {
              customerType: true,
            },
          },
        },
        order: {
          invoiceId: 'ASC',
        },
      });

      return result;
    } catch (err) {
      this.logger.error(`Failed to find all invoices. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_ALL_INVOICES,
        message: 'Fail to find all invoices',
      });
    }
  }

  async findOne(id: number): Promise<Invoice> {
    try {
      return await this.invoiceRepository.findOne({ where: { invoiceId: id } });
    } catch (err) {
      this.logger.error(`Failed to find invoice ID ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_INVOICE,
        message: 'Fail to find invoice.',
      });
    }
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    try {
      await this.invoiceRepository.update({ invoiceId: id }, updateInvoiceDto);
    } catch (err) {
      this.logger.error(`Failed to update invoice ID ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_INVOICE,
        message: 'Fail to update invoice.',
      });
    }
  }

  async remove(id: number) {
    try {
      await this.invoiceRepository.delete({ invoiceId: id });
    } catch (err) {
      this.logger.error(`Failed to delete invoice ID ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_DELETE_INVOICE,
        message: 'Fail to delete invoice.',
      });
    }
  }
}
