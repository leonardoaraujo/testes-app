import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Pessoa } from '../pessoa';
import { PessoasService } from '../../pessoas.service'

@Component({
  selector: 'app-pessoas-lista',
  templateUrl: './pessoas-lista.component.html',
  styleUrls: ['./pessoas-lista.component.css']
})
export class PessoasListaComponent implements OnInit {

  pessoas: Pessoa[] = [];
  pessoaSelecionado: Pessoa;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: PessoasService, 
    private router: Router) {}

  ngOnInit(): void {
    this.service
      .getPessoas()
      .subscribe( resposta => this.pessoas = resposta );
  }

  novoCadastro(){
    this.router.navigate(['/pessoas/form'])
  }

  preparaDelecao(pessoa: Pessoa){
    this.pessoaSelecionado = pessoa;
  }

  deletarPessoa(){
    this.service
      .deletar(this.pessoaSelecionado)
      .subscribe( 
        response => {
          this.mensagemSucesso = 'Pessoa deletado com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o pessoa.'  
      )
  }
}
