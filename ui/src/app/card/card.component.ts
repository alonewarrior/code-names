import {Component, Input, OnInit} from '@angular/core';
import {ICard} from '../models/ICard';

// @ts-ignore
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: ICard;
  @Input() showKey: boolean;

  constructor() { }

  ngOnInit(): void {
  }


  revealCard(): void {
    this.card.revealed = true;
  }

}
