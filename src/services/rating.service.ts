import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Rating from '../app/model/rating.model';


@Injectable({
  providedIn:  'root'
})

export class RatingService {

  private REST_API_SERVER = 'http://localhost:8080/rating';

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
  async addRating(body: Rating): Promise<object>{
    return await this.http.post(this.REST_API_SERVER + '/save', body).pipe(catchError(this.handleError)).toPromise();
  }
}
