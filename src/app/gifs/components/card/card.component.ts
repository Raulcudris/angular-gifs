import { Component, Input, OnInit } from '@angular/core';
import { Gifs } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  @Input()  
  public gif!: Gifs;

  ngOnInit(): void {
   if( !this.gif) throw new Error('Gif property is required')
  }

}
