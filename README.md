# AngularCrud (Memoteca)

Projeto construído com base no curso de Angular CRUD da ALURA

## Crição de componentes

Criando componentes utilizando ng generate component componente/cabecalho
Esse mesmo comando pode ser resumido para ng g c componente/cabecalho


Codificando o mesmo de acordo com o que foi apresentado no curso e incluindo o mesmo na tela inicial da aplicação

Incluindo o mesmo através do seletor
```
<app-cabecalho></app-cabecalho>
```

## Property Binding

Para o formulário do angular fazer o binding com o controlador (component.ts) é necessário utilizar a notação com colchetes

Para o caso do componente HTML possuir a propriedade value, pode-se utilizar a sintaxe:
```
[value]="pensamento.conteudo"
```

Para o caso do componente HTML não possuir a propriedade value, pode-se utilizar a sintaxe (chamada de interpolação):
```
{{ pensamento.conteudo }}
```

## Event Binding

Usamos a sintaxe de event binding
```
(evento)="metodo()"
```

## Diretiva

Utilizamos a diretiva (de atributo) ngModel para criar um fluxo de mão dupla dos dados (two way data-binding)
```
[(ngModel)]="pensamento.conteudo"
```

É necessário importar o FormsModule no app.module.ts para o funcionamento ocorrer corretamente.


## Rotas

Criando o arquivo de rotas do Angular (app-routing.module.ts)

Sempre que definimos um path para '', precisamos definir a propriedade pathMatch.

```
import { NgModule } from "@angular/core";
import {Router, RouterModule, Routes} from "@angular/router";
import {CriarPensamentoComponent} from "./componentes/pensamentos/criar-pensamento/criar-pensamento.component";
import {ListarPensamentoComponent} from "./componentes/pensamentos/listar-pensamento/listar-pensamento.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listarPensamento',
    pathMatch: 'full'
  },
  {
    path: 'criarPensamento',
    component: CriarPensamentoComponent
  },
  {
    path: 'listarPensamento',
    component: ListarPensamentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

As demais rotas, apontam para os componentes do angular. 

Nosso arquivo html inicial ficou da seguinte forma

```
<app-cabecalho></app-cabecalho>
<main>
  <router-outlet></router-outlet>
</main>
<app-rodape></app-rodape>

```

## Diretiva - routerLink

Inclusão da diretiva routerLink nos botões para direcionamento das telas da aplicação
