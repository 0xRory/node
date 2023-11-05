import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { WalletService } from '../service';
@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly service: WalletService) {}
  // @Get('/createOne')
  // public async create(): Promise<string> {
  //   return this.service.create();
  // }
  // @Get('/batchCreate')
  // public async batchCreate(): Promise<string> {
  //   return this.service.batchCreate();
  // }
  @Post('/bind')
  public async bind(certificate: string, @Res() res: Response) {
    const result = await this.service.bind(certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Post('/check')
  public async check(certificate: string, @Res() res: Response) {
    const result = await this.service.check(certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Post('/clearBind')
  public async clearBind(certificate: string, @Res() res: Response) {
    const result = await this.service.clearBind(certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Post('/transfer')
  public async transfer(
    from: string,
    to: string,
    value: string,
    @Res() res: Response,
  ): Promise<undefined> {
    const result = await this.service.transfer(from, to, value);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Post('/checkOp')
  public async checkOp(op: string, @Res() res: Response): Promise<undefined> {
    const result = await this.service.checkOp(op);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Get('/getBalance')
  public async getBalance(
    certificate: string,
    @Res() res: Response,
  ): Promise<undefined> {
    const result = await this.service.getBalance(certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
}