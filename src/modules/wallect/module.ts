import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '../../entities/wallect.entity';
import { WallectController } from './controller';
import { WallectService } from './service';
@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  exports: [],
  controllers: [WallectController],
  providers: [WallectService],
})
export class WallectModule {}
