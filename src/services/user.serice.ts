import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../app/model/user.model';
import {Observable} from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${config.apiUrl}/users/register`, user);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${config.apiUrl}/users/${id}`);
  }
}
