import { Controller, Get } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Controller()
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Get()
  findAll(): Array<string> {
    return this.dogsService.findAll();
  }
}
