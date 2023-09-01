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
