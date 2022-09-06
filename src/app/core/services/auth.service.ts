import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  sign(payload: {email: string, password: string} ): Observable<any>{
    return this.http.post<{token: string}>(`${this.url}/sign`, payload).pipe(
      map((res)=> {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.token);
        return this.router.navigate(['/admin']);
      }),
      catchError((e)=>{
        if(e.error.message)return throwError(() => e.error.message);

        return throwError(() => "Servidor não encontrado ou sem conexão! Favor tente mais tarde!");
      })
    )
  }
  logout(){
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if(!token) return false;

    const helper = new JwtHelperService();   
    return !helper.isTokenExpired(token); 
  }
}
