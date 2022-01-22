import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('https://blogjhon.herokuapp.com/usuarios/logar', userLogin);
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://blogjhon.herokuapp.com/usuarios/cadastrar', usuario);

  }
}
