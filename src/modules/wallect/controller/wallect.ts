import { ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import { WallectService } from '../service';
@ApiTags('Wallect')
@Controller('wallect')
export class WallectController {
  constructor(private readonly service: WallectService) {}
  @Post('/createOne')
  public async create(): Promise<string> {
    return this.service.create();
  }
  // @Post('/batchCreate')
  // public async batchCreate(): Promise<string> {
  //   return this.service.batchCreate();
  // }
  @Post('/bind')
  public async bind(): Promise<string> {
    return await this.service.bind();
  }
}
