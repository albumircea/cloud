import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Size from '../app/model/size.model';

@Injectable({
  providedIn:  'root'
})

export class SizeService {

  private REST_API_SERVER = 'http://localhost:8080/size';

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

  getSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(this.REST_API_SERVER + '/all').pipe(catchError(this.handleError));
  }

  getOneSize(id: string | null): Observable<Size>{
    return  this.http.get<Size>(this.REST_API_SERVER + `/id?sizeId=${id}`).pipe(catchError(this.handleError));
  }
}
