import { Injectable } from '@nestjs/common';

@Injectable()
export class DogsService {
  private dogs: Array<string> = ['spot', 'lassie'];

  findAll(): Array<string> {
    return this.dogs;
  }
}
