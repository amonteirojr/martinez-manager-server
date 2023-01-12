import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { Admentment } from '../admentment/entities/admentment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContractService } from './contract.service';
import { ContractFiltersDTO } from './dto/contract-filters.dto';
import { ContractInfoCountResponseDTO } from './dto/contract-info-count-response.dto';
import { ContractTableResponseDTO } from './dto/contract-table-response.dto';
import { CreateOrUpdateContractDTO } from './dto/create-or-update-contract.dto';
import { Contract } from './entitites/contract.entity';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get('/summary')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: ContractInfoCountResponseDTO })
  async getContractsInfoCount(@Res() res: Response) {
    const summary = await this.contractService.getContractSummary();
    return res.send(summary);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Array<Contract> })
  async getAllContracts(
    @Res() res: Response,
    @Query() filter: ContractFiltersDTO,
  ) {
    const contract = await this.contractService.getContractsWithActualValues(
      filter,
    );
    return res.send(contract);
  }

  @Get('/table')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Array<ContractTableResponseDTO> })
  async getContractsList(@Res() res: Response) {
    const contract = await this.contractService.getContractsForTable();
    return res.send(contract);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Contract })
  async getContractById(@Res() res: Response, @Param('id') contractId: number) {
    const contract = await this.contractService.getContractById(contractId);
    return res.send(contract);
  }

  @Get('/details/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Contract })
  async getContractDetailsById(
    @Res() res: Response,
    @Param('id') contractId: number,
  ) {
    const contract = await this.contractService.getContractDetailsById(
      contractId,
    );

    return res.send(contract);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateContractById(
    @Res() res: Response,
    @Param('id') contractId: number,
    @Body() updateContractDTO: CreateOrUpdateContractDTO,
  ) {
    const contract = await this.contractService.updateContractById(
      contractId,
      updateContractDTO,
    );
    return res.send(contract);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Contract })
  async createContract(
    @Res() res: Response,
    @Body() updateContractDTO: CreateOrUpdateContractDTO,
  ) {
    const contract = await this.contractService.createContract(
      updateContractDTO,
    );
    return res.send(contract);
  }

  @Get('/:id/admentments')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Array<Admentment> })
  async getContractAdmentments(@Res() res: Response, @Param('id') id: number) {
    const admentments = await this.contractService.getContractAdmentments(id);
    return res.send(admentments);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Res() res: Response, @Param('id') id: number) {
    await this.contractService.deleteContractById(id);
    return res.send();
  }

  @Get('/list/report')
  @HttpCode(HttpStatus.OK)
  async getContractList(
    @Res() res: Response,
    @Query() filters?: ContractFiltersDTO,
  ) {
    const file = await this.contractService.printContractList(filters);
    const filename = `${randomUUID()}.pdf`;
    res.contentType('application/pdf');
    res.setHeader('Filename', filename);
    return res.send(file);
  }
}
