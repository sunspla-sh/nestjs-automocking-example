import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    /**
     * Nestjs allows us to define a mock factory to apply all of our missing dependencies. This is useful for cases
     * where we have a large number of dependencies in a class and mocking all of them will take a long time and
     * a lot of setup. To make use of this feature, the .createTestingModule() method will need to be chained
     * with the .useMocker() method, passing a factory for our dependency mocks. The factory can take an optional token,
     * which is an instance token (any token which is valid for a Nest provider) and returns a mock implementation.
     */
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    })
      .useMocker((token) => {
        /**
         * This function is an example of creating a generic mocker using jest-mock and
         * a specific mock for CatsService using jest.fn()
         */
        const results = ['test1', 'test2'];
        if (token === CatsService) {
          return { findAll: jest.fn().mockReturnValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    /**
     * In addition to being able to retrieve the providers listed in the .createTestingModule() config
     * using the .get() method, we're also able to retrieve any of our mocks from the testing container.
     */
    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be instance of CatsController', () => {
    expect(controller).toBeInstanceOf(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', () => {
      const val = controller.findAll();
      expect(val).toEqual(['test1', 'test2']);
    });
  });
});
