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


## Criando modelo de retorno da API (Interface)

Precisamos garantir que o backend e o frontend falem seguindo a mesma estrutura de dados. 
Para isso, criamos interfaces como modelos de dados. 
A interface recebe EXPORT para que possa ser utilizada por outros componentes da aplicação.

```
export interface Pensamento {
  id: number
  conteudo: string
  autoria: string
  modelo: string
}
```

Todas as variáveis, então, podem ser tipadas com esse novo formato Pensamento

## Criando Service

Service são elementos que serão responsàveis pela comunicação entre o front end e o back end.

Para criar um service, é necessário executar o comando (obedecendo o caminho correto)

```
ng g s componentes/pensamentos/pensamento

...

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  constructor() { }
}

```

Injectable significa que o serviço pode ser injetado em outros componentes do projeto.
providedIn significa que o serviço pode ser utilizado por todas as partes da aplicação (já que foi definido o valor root)

## Injeção de dependência

No angular, a injeção de dependência é um padrão de projeto, logo, essa injeção vai ocorrer automaticamente uma vez que um componente 
necessite de uma determinada instância. 

Definimos um parâmetro como private no construtor, para que, automaticamente, esse se torne um atributo da classe em questão.

```
constructor(private http: HttpClient) { }
```

Lembrando que é necessário realizar a importação do HttpClientModule no app.module

```
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
```

## Construindo chamadas ao backend

Inicialmente vamos definir o endereço da API (endereço exibido quando o json-server fica online).

Vamos utilizar o método GET do Http para retornar a lista de Pensamentos.

```
private readonly API = 'http://localhost:3000/pensamentos';

listar() {
  return this.http.get<Pensamento[]>(this.API);
}
```

## Observables

Utilizados de forma interna no Angular, para obter dados e informações de forma constante. 

Similar ao Promisses, o Observable oferece o mesmo recurso de observação, com o adicional de permitir uma troca constante de dados.

Inicialmente, vamos tipar o retorno do método do service
```
listar(): Observable<Pensamento[]> {
  return this.http.get<Pensamento[]>(this.API);
}
```

Em seguida, precisamos tratar o retorno do uso desse método, subcrevendo no canal de comunicação.

```
listaPensamentos: Pensamento[] = [];


this.service.listar().subscribe(listaPensamentos => {
  this.listaPensamentos = listaPensamentos;
});
```

## Método de Criar

No serviço
```
criar(pensamento: Pensamento): Observable<Pensamento> {
  return this.http.post<Pensamento>(this.API, pensamento);
}
```

No componente
```
criarPensamento() {
  this.service.criar(this.pensamento).subscribe(() => {
    this.router.navigate(['/listarPensamento']);
  })
}
```

## Método de Excluir

Criando um componente para ficar responsável pela exclusão

Este componente será o modal que deve questionar se a exclusão deve mesmo ser realiada. 

```
<section class="container ff-inter excluir-pensamentos">
  <div class="modal">
    <p>O pensamento será deletado. <br /> Confirma a exclusão?</p>
    <div class="acoes">
      <button class="botao botao-excluir" (click)="excluirPensamento()">Excluir</button>
      <button class="botao botao-cancelar" (click)="cancelar()">Cancelar</button>
    </div>
  </div>

  <div class="overlay"></div>
</section>

```

Precisaremos de alguns recursos para obter o ID do pensamento selecionado e direcionamento de rotas
```
  constructor(private service: PensamentoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe(pensamento => {
      this.pensamento = pensamento;
    })
  }

  excluirPensamento() {
    if (this.pensamento.id) {
      this.service.excluir(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
```
snapshot - obtem informações das rota no momento da invocação
paramMap - traz um map das informações dos paramentors obrigatórios e opcionais daquela rota 


Precisaremos também de um método auxiliar no service, para obter pensamentos por id

```
  excluir(id: number): Observable<Pensamento> {
    const URL = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(URL);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const URL = `${this.API}/${id}`;
    return this.http.get<Pensamento>(URL);
  }
```

Precisamos definir as rotas corretamente, no app-routing.module.ts

```
  {
    path: 'pensamentos/excluirPensamento/:id',
    component: ExcluirPensamentoComponent
  }
```

Por fim, precisamos definir a correta chamada ao exlcuir, através de routerLinks

```
    <button class="botao-excluir" routerLink="/pensamentos/excluirPensamento/{{pensamento.id}}">
      <img src="../../../../assets/imagens/icone-excluir.png" alt="Ícone de Excluir">
    </button>
```


## Método de Editar

Criação do comportamento no service

```
editar(pensamento: Pensamento): Observable<Pensamento> {
    const URL = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(URL, pensamento);
  }
```

Criamos um componente para tratar as demandas de edição

Neste componente, adicionamos os comportamentos de editar e cancelar, chamando o service

```
pensamento: Pensamento = {
    id: '',
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(private service: PensamentoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe(pensamento => {
      this.pensamento = pensamento;
    })
  }

  editarPensamento() {
    if (this.pensamento.id) {
      this.service.editar(this.pensamento).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
```

Precisamos definir a rota para o novo componente de editar (app-routing.module.ts)

```
{
    path: 'pensamentos/editarPensamento/:id',
    component: EditarPensamentoComponent
  }
```

Por fim, precisamos invocar corretamente a nova rota com o routerLink

```
    <button class="botao-editar" routerLink="/pensamentos/editarPensamento/{{pensamento.id}}">
      <img src="../../../../assets/imagens/icone-editar.png" alt="Ícone de Editar">
    </button>
```


# Angular 14 (Evoluindo a Aplicação)

## Utilizando FormBuilder

Primeiro passo é importar a dependência ReactiveFormsModule em app.module.ts

Com isso podemos: 

1. Definir uma variável do tipo FormGroup
```
  formulario!: FormGroup;
```

2. Incluir uma nova injeção no construtor (FormBuilder)
``` 
  constructor(private service: PensamentoService,
              private router: Router,
              private formBuilder: FormBuilder) { }
```

3. Inicializar a variável formulário
```
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['Formulário reativo'],
      autoria: [],
      modelo: ['modelo1']
    });
  }
```

Lembrando que o formulário também pode ser criado utilizando a seguinte notação"
```
ngOnInit(): void {
    this.formulario = new FormGroup({
      conteudo: new FormControl(''),
      autoria: new FormControl(''),
      modelo: new FormControl('')
    })
  }
```

## Renderizando o formulário do FormBuilder

Primeiro passo é remover o binding bidirecional que existe com o ngModel, nas telas HTML.

Logo em seguinda, precisamos vincular o formulário html com o formulário da classe

```
<form [formGroup]="formulario">
```

Para associar os campos de input, usamos formControlName
```
<input type="radio" id="modelo1" value="modelo1" formControlName="modelo">
```
Onde o nome apresentado deve ser o mesmo definido na construção do formBuilder.


## Incluindo validações

As validações podem ser incluídas utilizando Validators
```
ngOnInit(): void {
  this.formulario = this.formBuilder.group({
    conteudo: ['Formulário reativo', [Validators.required]],
    autoria: ['Angular', [Validators.required]],
    modelo: ['modelo1']
  });
}
```

E a verificação do formulário pode ser realizada através do valid
```
if (this.formulario.valid) {
```

## Melhorando validações

Validações mais detalhadas podem ser feitas utilizando o compose. 
A primeira delas, não permite caracteres em branco, a segunda delas não permite textos menores que 3 caracteres. 
```
ngOnInit(): void {
  this.formulario = this.formBuilder.group({
    conteudo: ['Formulário reativo', Validators.compose([
      Validators.required,
      Validators.pattern(/(.|s)*\S(.|\s)*/)
      ])],
    autoria: ['Angular', Validators.compose([
      Validators.required,
      Validators.minLength(3)
    ])],
    modelo: ['modelo1']
  });
}
```

## Exibindo mensagens de erro

Podemos acessar as informações de erro do formulário através do errors. 
Com isso, podemos incluir uma DIV abaixo do input que vai ser renderizada conforme a presença de erros

```
<input type="textarea" class="input" id="pensamento" formControlName="conteudo"
       placeholder="Digite o pensamento">
<div class="mensagem__erro" *ngIf="formulario.get('conteudo')?.errors">
  Pensamento é obrigatório
</div>
```

Para o caso de diferentes tipos de erros de validação, podemos renderizar de acordo com o mesmo
```
    <input type="text" class="input" id="autoria" formControlName="autoria"
           placeholder="Digite a autoria ou fonte">
    <div class="mensagem__erro" *ngIf="formulario.get('autoria')?.errors?.['required']">
      Autoria é obrigatória
    </div>
    <div class="mensagem__erro" *ngIf="formulario.get('autoria')?.errors?.['minlenght']">
      Autoria precisa ter no mínimo 3 caracteres
    </div>
```


Para evitar que os erros de validação ocorram logo ao entrar na tela, podemos utilizar a propriedade touched

```
<label for="pensamento">Pensamento</label>
<input type="textarea" class="input" id="pensamento" formControlName="conteudo"
       placeholder="Digite o pensamento">
<div class="mensagem__erro" *ngIf="formulario.get('conteudo')?.errors && formulario.get('conteudo')?.touched">
  Pensamento é obrigatório
</div>

<label for="autoria">Autoria ou Fonte</label>
<input type="text" class="input" id="autoria" formControlName="autoria"
       placeholder="Digite a autoria ou fonte">
<div class="mensagem__erro" *ngIf="formulario.get('autoria')?.errors?.['required'] && formulario.get('autoria')?.touched">
  Autoria é obrigatória
</div>
<div class="mensagem__erro" *ngIf="formulario.get('autoria')?.errors?.['minlenght'] && formulario.get('autoria')?.touched">
  Autoria precisa ter no mínimo 3 caracteres
</div>
```

## Desabilitando botões para formulários inválidos

Para isso podemos utilizar a diretiva disable para desabilitar o botão.
Como complement, podemos usar a diretiva ngClass para alterar dinamicamente o css do componente. 

```
<button (click)="criarPensamento()"
        [disabled]="!formulario.valid"
        [ngClass]="habilitarBotao()" >Salvar</button>
```


## Paginação

O Json server, utilizado neste projeto, dá suporte à paginação.
https://github.com/typicode/json-server#paginate

Foi realizada uma modificação no método listar (e nas chamadas ao mesmo) 
```
  listar(pagina: number): Observable<Pensamento[]> {
    const itensPorPagina = 6;
    return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${itensPorPagina}`);
  }
```

Mas, refatorando para manter o código organizado, podemos utilizar HttpParams

```
listar(pagina: number): Observable<Pensamento[]> {
  const itensPorPagina = 6;
  
  let params = new HttpParams()
    .set('_page', pagina)
    .set('_limit', itensPorPagina);
  
  // return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${itensPorPagina}`);
  return this.http.get<Pensamento[]>(this.API, { params: params });
}
```

No carregamento de mais dados, utilizamos o operador de Spread de JS (...), para que a lista seja acrescida com os elementos da lista recebida. 

```
carregarMaisPensamentos() {
  this.service.listar(++this.paginaAtual).subscribe(listaPensamentos => {
    this.listaPensamentos.push(...listaPensamentos);
  });
}
```

A paginação foi possível com a criação do componente botao-carregar-mais.


## Busca / Filtro

Da mesma forma que na paginação, a API também nos oferece a possibilidade de pesquisas.
https://github.com/typicode/json-server#full-text-search

O método listar (de pensamento.service) foi modificado para receber o campo de filtro/busca.

```
listar(pagina: number, filtro: string): Observable<Pensamento[]> {
  const itensPorPagina = 6;

  let params = new HttpParams()
    .set('_page', pagina)
    .set('_limit', itensPorPagina);

  if (filtro.trim().length > 2) {
    params = params.set('q', filtro);
  }

  return this.http.get<Pensamento[]>(this.API, { params: params });
}
```


Foi criado o método pesquisarPensamentos para realizar a busca quando algum valor for digitado no campo de busca

```
pesquisarPensamentos() {
  this.paginaAtual = 1;
  this.haMaisPensamentos = true;
  this.service.listar(this.paginaAtual, this.filtro).subscribe(listaPensamentos => {
    this.listaPensamentos = listaPensamentos;
  });
}
```


## Favoritando Pensamentos

Foi incluída uma nova propriedade ao modelo (interface) para que seja armazenada a informação de favorito.

Como o banco de dados (Json server) já possuía dados antes da funcionalidade ser criada, precisamos alterar o arquivo db.json para manter o modelo de dados consistente.

Foi criado um método adicional no service
```
  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }
```

Foi criando um novo botão na tela de listar pensamentos (no compomente de pensamento)
```
    <button class="botao-favorito" (click)="atualizarFavoritos()">
      <img src="../../../../assets/imagens/icone-favorito-{{ mudarIconeFavorito() }}.png" alt="Ícone favorito {{ mudarIconeFavorito() }}">
    </button>
```

Demais métodos auxiliares foram criados no pensamento.component.ts
```
  mudarIconeFavorito(): string {
    if (this.pensamento.favorito == false) {
      return 'inativo';
    } else {
      return 'ativo';
    }
  }

  atualizarFavoritos() {
    this.service.mudarFavorito(this.pensamento).subscribe(() => {});
  }
```

## Atualizando lista após interação

O método listar do service foi alterado para receber a flag de favorito

```
  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]> {
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itensPorPagina);

    if (filtro.trim().length > 2) {
      params = params.set('q', filtro);
    }
    if (favoritos) {
      params = params.set('favorito', true);
    }

    return this.http.get<Pensamento[]>(this.API, { params: params });
  }
```

O pensamento.component recebeu uma variável @Input e uma nova lógica para atualizar favoritos.

```
@Input() listaFavoritos: Pensamento[] = [];

  atualizarFavoritos() {
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1);
    });
  }
```

E por fim, esse input é alimentado pelo componente pai, com uma lista obtido utilizando o novo método de listsar do service.

```
<app-pensamento
  [pensamento]="pensamento"
  [listaFavoritos]="listaFavoritos">
</app-pensamento>
```


