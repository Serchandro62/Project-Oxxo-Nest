import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Region, Manager])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
