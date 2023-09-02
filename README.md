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

## Componentização

Criação do primeiro componente - pensamento
Utilizando o mesmo na página de listarPensamentos (inclusão da tag <app-pensamento></app-pensamento>)

## Utilizando Diretivas estruturais (ngFor)

Utilizando para repetir elementos HTML na interface

```
<div *ngFor="let pensamento of listaPensamentos">
  <app-pensamento></app-pensamento>
</div>
```

## Comunicação entre componentes

A comunicação entre os componentes funciona através de inputs e outputs
@Input() informa que a informação será recebida (enviada pelo componente pai)

```
@Input() pensamento = {
  conteudo: 'I love Angular',
  autoria: 'Gleibson Oliveira',
  modelo: 'modelo3'
}
```

O envio das informações é feito através do property binding ([pensamento]), conforme mostrado abaixo

```
<div *ngFor="let pensamento of listaPensamentos">
  <app-pensamento [pensamento]="pensamento"></app-pensamento>
</div>
```

## Utilizando Diretivas estruturais (ngIf)

Utilizando para condicionar a exibição de elementos na tela

```
<div class="mural" *ngIf="listaPensamentos.length > 0">
  <div *ngFor="let pensamento of listaPensamentos">
    <app-pensamento [pensamento]="pensamento"></app-pensamento>
  </div>
</div>
```

## Componente ng-template

O componente em questão não é renderizado por padrão pelo angular. Para isso, precisamos passar mais instruções. 

A implementação do else foi definida para exibir o template na tela

```
<div class="mural" *ngIf="listaPensamentos.length > 0, else semPensamentos">
  <div *ngFor="let pensamento of listaPensamentos">
    <app-pensamento [pensamento]="pensamento"></app-pensamento>
  </div>
</div>

<ng-template #semPensamentos>
  <div class="ff-inter sem-pensamentos">
    <p>Ainda não há pensamentos cadastrados!</p>
  </div>
</ng-template>
```

## Utilizando diretiva de mudança de estilo (ngClass)

A diretiva ngClass é capaz de carregar/mudar a classe dos elementos de acordo com algumas condições.

```
<div class="pensamento {{ pensamento.modelo }} ff-roboto-mono" [ngClass]="larguraPensamento()" >

...

larguraPensamento(): string {
  if (this.pensamento.conteudo.length >= 256) {
    return 'pensamento-g';
  }
  return 'pensamento-p';
}
  
```

## Configurando o JSON Server

Para acelerar o processo de teste e integração, podemos utilizar um backend 'fake' para responder as nossas requisições.
Criando uma pasta Backend e rodando o seguinte commando, dentro da pasta, para criar o arquivo package.json

```
npm init -y
```

Em seguida, iremos instalar o json server

```
npm i json-server
```

Em seguida, vamos criar o arquivo db.json (contendo todos os endpoints da nossa aplicação)

```
{
  "pensamentos": [
    {
      "id": 1,
      "conteudo": "Que bom que você veio",
      "autoria": "Gleibson",
      "modelo": "modelo1"
    },
    {
      "id": 2,
      "conteudo": "Estudando Angular",
      "autoria": "Dev Alura",
      "modelo": "modelo2"
    },
    {
      "id": 3,
      "conteudo": "Angular é o melhor",
      "autoria": "Gleibson",
      "modelo": "modelo3"
    }
  ]
}
```

Em seguinda, vamos no package.json vamos realizar as seguintes alterações (start)

```
  "scripts": {
    "start": "json-server --watch db.json --port 3000"
  },
```

O teste pode ser realizado executando npm start no terminal
