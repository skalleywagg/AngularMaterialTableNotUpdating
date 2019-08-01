import { generate } from 'shortid';

export class Example {

  public id: string;

  constructor(public firstName: string, public lastName: string) {
    this.id = generate();
  }

}
