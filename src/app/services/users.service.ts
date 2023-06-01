import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpUsersListResponse, UserAddType, UserType } from '../types/users.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public perPage= 6;

  constructor(protected http: HttpClient) { }
  getUsers(page: number): Observable<HttpUsersListResponse> {
    return this.http.get<HttpUsersListResponse>(`${environment.apiLink}/users?page=${page}&per_page=${this.perPage}`);
  }
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiLink}/users/${userId}`).pipe(
      catchError((error: any) => {
        console.log(error);
        return throwError('Failed to delete user.');
      })
    );
  }

  createUser(user: UserAddType): Observable<HttpUsersListResponse> {
    return this.http.post<HttpUsersListResponse>(`${environment.apiLink}/users`, user)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return throwError('Failed to create user.');
        })
      );
  }


}
