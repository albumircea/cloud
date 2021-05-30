import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Brand from '../app/model/brand.model';

@Injectable({
  providedIn:  'root'
})

export class BrandService {

  private REST_API_SERVER = 'http://localhost:8080/brand';

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error code: ${error.status}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.REST_API_SERVER + '/all').pipe(catchError(this.handleError));
  }

  getOneBrand(id: string | null): Observable<Brand>{
    return  this.http.get<Brand>(this.REST_API_SERVER + `/id?brandId=${id}`).pipe(catchError(this.handleError));
  }
}
