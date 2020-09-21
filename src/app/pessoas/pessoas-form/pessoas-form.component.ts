import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Pessoa } from '../pessoa'
import { PessoasService } from '../../pessoas.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pessoas-form',
  templateUrl: './pessoas-form.component.html',
  styleUrls: ['./pessoas-form.component.css']
})
export class PessoasFormComponent implements OnInit {

  pessoa: Pessoa;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor( 
      private service: PessoasService ,
      private router: Router,
      private activatedRoute : ActivatedRoute
      ) {
    this.pessoa = new Pessoa();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getPessoaById(this.id)
            .subscribe( 
              response => this.pessoa = response ,
              errorResponse => this.pessoa = new Pessoa()
            )
        }
    })
  }

  voltarParaListagem(){
    this.router.navigate(['/pessoas/lista'])
  }

  onSubmit(){
    if(this.id){

      this.service
        .atualizar(this.pessoa)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o pessoa.']
        })


    }else{

      this.service
        .salvar(this.pessoa)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.pessoa = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          })

    }

  }

}
