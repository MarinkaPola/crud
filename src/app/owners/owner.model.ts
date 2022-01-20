import {Car} from '../interface';

export interface Owner {
  id?: number| null| undefined;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  cars?: Car[] | undefined;
}
