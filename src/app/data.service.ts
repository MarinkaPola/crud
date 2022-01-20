import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Owner} from './owners/owner.model';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() {
  }

  createDb() {
    const owners = [
      {
        id: 1,
        LastName: 'Seaman Cap',
        FirstName: 'Seaman Cap',
        MiddleName: 'Lorem ipsum',
         cars: [{
          number: '1063uy',
          brand: 'BMW',
          model: 'optima',
          year: 2012,
        },
          {
            number: '1060uy',
            brand: 'kia',
            model: 'optima',
            year: 2010,
          },
        ]
      },
      {
        id: 2,
        LastName: 'Cap',
        FirstName: 'Cap',
        MiddleName: 'Lorem',
        cars: [{
          number: '1059uy',
          brand: 'audi',
          model: 'accent',
          year: 2009,
        }, ]
      },
      {
        id: 3,
        LastName: 'Cap2',
        FirstName: 'Cap2',
        MiddleName: 'Lorem2',
        cars: [{
          number: '1061uy',
          brand: 'BMW',
          model: 'accent',
          year: 2011,
        }], }];
    return {owners};
  }

 /* genId(owners: Owner[]): number {
    return owners.length > 0 ? Math.max(...owners.map(owner => owner.id )) + 1 : 3;
  }*/
  }
