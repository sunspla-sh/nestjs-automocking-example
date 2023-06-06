import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  cats: Array<string> = ['bob the cat', 'jim the cat'];

  findAll(): Array<string> {
    return this.cats;
  }
}
