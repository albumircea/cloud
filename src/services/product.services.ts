import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Product} from '../app/model/product.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService{
  private REST_API_SERVER = 'http://localhost:8080/product';

  private handleError(error: HttpErrorResponse): Observable<never>{
    let errorMessage = 'Unknow error';
    if (error.error instanceof ErrorEvent){
      errorMessage = `Error ${error.error.message}`;
    }else{
      errorMessage = `Error code ${error.status}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.REST_API_SERVER + `/all`).pipe(catchError(this.handleError));
  }
  public getOneProduct(id: string | null): Observable<Product>{
    return this.http.get<Product>(this.REST_API_SERVER + `/id?productId=${id}`);
  }

  public addOneProduct(body: Product): Observable<Product>{
    return this.http.post<Product>(this.REST_API_SERVER + `/save`, body);
  }
  public updateProduct(body: Product): Observable<Product>{
    return this.http.put<Product>(this.REST_API_SERVER + `/update`, body);
  }

  public deleteProduct(id: string): Observable<any>{
    return this.http.delete(this.REST_API_SERVER + `/delete?productId=${id}`);
  }

}
