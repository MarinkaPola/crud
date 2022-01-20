import {Injectable} from '@angular/core';
import {Owner} from './owner.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Car} from '../interface';


@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private ownersUrl = 'api/owners/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.ownersUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getOwnerById(id: number): Observable<Owner> {
    return this.http.get<Owner>(this.ownersUrl + id).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createOwner(owner: Owner): Observable<Owner> {
    owner.id = null;
    return this.http.post<Owner>(this.ownersUrl, owner, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  editOwner(owner: Owner): Observable<Owner> {
    console.log(owner.id);
    return this.http.put<Owner>(this.ownersUrl + owner.id, owner, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }


  deleteOwner(owner: Owner): Observable<any> {
    return this.http.delete(this.ownersUrl + owner.id);
  }


  editOwnerCar(car: Car, owner: Owner) {
    console.log(owner.id);
    const index = owner.cars?.indexOf(car);
    if (index){const newOwner = owner.cars?.splice(index, 1);
               return this.http.put<Owner>(this.ownersUrl + owner.id, newOwner, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
    } return;
  }
}

