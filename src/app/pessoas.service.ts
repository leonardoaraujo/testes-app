import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Pessoa } from './pessoas/pessoa';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  apiURL: string = environment.apiURLBase + '/api/pessoas';

  constructor( private http: HttpClient ) {}

  salvar( pessoa: Pessoa ) : Observable<Pessoa> {
    return this.http.post<Pessoa>( `${this.apiURL}/salvar/` , pessoa);
  }

  atualizar( pessoa: Pessoa ) : Observable<any> {
    return this.http.put<Pessoa>(`${this.apiURL}/atualizar/${pessoa.id}` , pessoa);
  }

  getPessoas() : Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiURL);
  }
  
  getPessoaById(id: number) : Observable<Pessoa> {
    return this.http.get<any>(`${this.apiURL}/pesquisar/${id}`);
  }

  deletar(pessoa: Pessoa) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/apagar/${pessoa.id}`);
  }

}
