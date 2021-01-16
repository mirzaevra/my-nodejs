import {Injectable} from '@angular/core';
import {User} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';

  constructor(
    private http: HttpClient
  ) {
  }


  public register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  public login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(({token}) => {
          this.setToken(token);
          localStorage.setItem('auth-token', token);
        })
      );
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logout(): void {
    this.setToken('');
    localStorage.clear();
  }
}
