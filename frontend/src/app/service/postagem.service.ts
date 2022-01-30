import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Postagem } from '../model/Postagem';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens (): Observable<Postagem[]>{

    return this.http.get<Postagem[]>('https://blogjhon.herokuapp.com/postagens', this.token)
  }

  getByIdPostagens (id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`https://blogjhon.herokuapp.com/postagens/${id}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{

    return this.http.post<Postagem>('https://blogjhon.herokuapp.com/postagens', postagem, this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>('https://blogjhon.herokuapp.com/postagens', postagem, this.token)
  }

  deletePostagem(id: number) {
    return this.http.delete(`https://blogjhon.herokuapp.com/postagens/${id}`, this.token)
  }

}
