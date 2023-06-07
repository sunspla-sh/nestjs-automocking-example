import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { CustomLoggerInterceptor } from '../logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    DogsService,
    // { provide: APP_INTERCEPTOR, useClass: CustomLoggerInterceptor }, //registered as global interceptor even though its in DogsModule
    //below is an alternative method of registering as global interceptor even though its in DogsModule
    //we need to do it this way so that we can replace it with a mock in the e2e tests
    { provide: APP_INTERCEPTOR, useExisting: CustomLoggerInterceptor },
    CustomLoggerInterceptor,
  ],
  controllers: [DogsController],
})
export class DogsModule {}
