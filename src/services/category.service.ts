import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Category from '../app/model/category.model';

@Injectable({
  providedIn:  'root'
})

export class CategoryService {

  private REST_API_SERVER = 'http://localhost:8080/category';

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

  getCategorys(): Observable<Category[]> {
    return this.http.get<Category[]>(this.REST_API_SERVER + '/all').pipe(catchError(this.handleError));
  }

  getOneCategory(id: string | null): Observable<Category>{
    return  this.http.get<Category>(this.REST_API_SERVER + `/id?categoryId=${id}`).pipe(catchError(this.handleError));
  }
}
