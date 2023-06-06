import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { DogsService } from './dogs.service';

describe('DogsController', () => {
  let dogsController: DogsController;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    /**
     * Here we're chaining the .useMocker() method which expects a factory function and is used to create all
     * of our mock dependencies. In this case, we use the createMock function from the @golevelup/ts-jest library,
     * which creates mock objects for us with all sub properties mocked as jest.fn() for every single dependency,
     * saving us from having to manually define all of them.
     */
    moduleRef = await Test.createTestingModule({
      controllers: [DogsController],
    })
      .useMocker(createMock)
      .compile();
    dogsController = moduleRef.get<DogsController>(DogsController);
  });

  it('should be defined', () => {
    expect(dogsController).toBeDefined();
  });
  it('should be instance of DogsController', () => {
    expect(dogsController).toBeInstanceOf(DogsController);
  });

  describe('findAll', () => {
    it('should return array of dogs', () => {
      //Arrange
      const result = ['test1'];
      const dogsService: DeepMocked<DogsService> = moduleRef.get(DogsService);

      dogsService.findAll.mockReturnValue(result);
      //Act
      const foundDogs = dogsController.findAll();
      //Assert
      expect(foundDogs).toEqual(result);
    });
  });
});
