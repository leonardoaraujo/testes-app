import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasFormComponent } from './pessoas-form/pessoas-form.component'
import { PessoasListaComponent } from './pessoas-lista/pessoas-lista.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard'


const routes: Routes = [
  { path : 'pessoas' , component: LayoutComponent, 
    canActivate: [AuthGuard] ,children: [
    
    { path: 'form' , component: PessoasFormComponent },
    { path: 'form/:id' , component: PessoasFormComponent },
    { path: 'lista', component: PessoasListaComponent },
    { path: '', redirectTo : '/pessoas/lista', pathMatch: 'full' }

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
