import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContractService } from './contract.service';
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
  async getAllContracts(@Res() res: Response) {
    const contract = await this.contractService.getAllContracts();
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

  @Put('/:id')
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
}
