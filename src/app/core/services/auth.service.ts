import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
  ) { }

  sign(payload: {email: string, passwor: string} ): Observable<any>{
    return this.http.post(`${this.url}/sign`, payload).pipe(
      map((res)=> {
        return console.log(res)
      }),
      catchError((e)=>{
        if(e.error.message)return throwError(() => e.error.message);

        return throwError(() => "Servidor não encontrado ou sem conexão! Favor tente mais tarde!");
      })
    )
  }
}
