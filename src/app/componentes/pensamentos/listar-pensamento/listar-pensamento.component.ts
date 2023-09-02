import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos = [
    {
      conteudo: 'Passo informações para o componente filho',
      autoria: 'Componente Pai',
      modelo: 'modelo3'
    },
    {
      conteudo: 'Minha propriedade é decorada com @Input()',
      autoria: 'Componente Filho',
      modelo: 'modelo2'
    },
    {
      conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et odio eu tortor ultricies facilisis sed vitae tellus. Praesent placerat metus et diam ultrices, non hendrerit sem pellentesque. Donec ex elit, pharetra id fringilla eget, gravida venenatis tellus. Donec laoreet enim nec ex imperdiet tristique. In maximus dapibus enim pellentesque tincidunt. Maecenas id aliquet enim, at pharetra ipsum. Nunc porta velit quis posuere maximus. Nullam metus purus, egestas vitae facilisis eu, fermentum eget neque. Nulla quam nulla, elementum eu hendrerit vel, varius ac dui. Morbi venenatis viverra mauris ac sodales. Pellentesque feugiat arcu ipsum. Etiam convallis vehicula sollicitudin. Cras nec sapien vel ipsum vehicula placerat. Sed arcu ex, tincidunt ullamcorper orci venenatis, condimentum rhoncus orci. Ut sed ornare lectus. In hac habitasse platea dictumst.',
      autoria: '',
      modelo: 'modelo1'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
