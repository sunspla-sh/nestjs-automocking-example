import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DogsModule } from '../src/dogs/dogs.module';
import { CustomLoggerInterceptor } from '../src/logger.interceptor';
import { MockLoggerInterceptor } from '../src/mocklogger.interceptor';
import { DogsService } from '../src/dogs/dogs.service';

describe('Dogs', () => {
  let app: INestApplication;
  const dogsService = { findAll: () => ['dog1', 'dog2'] };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [DogsModule],
    })
      .overrideProvider(CustomLoggerInterceptor)
      .useClass(MockLoggerInterceptor)
      .overrideProvider(DogsService)
      .useValue(dogsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET dogs', () => {
    return request(app.getHttpServer())
      .get('/dogs')
      .expect(200)
      .expect(dogsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
