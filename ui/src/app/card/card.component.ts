import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICard} from '../models/ICard';
import {cardType} from '../models/card-type-enum';

// @ts-ignore
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: ICard;
  @Input() showKey: boolean;
  @Output() cardSelected: EventEmitter<cardType> = new EventEmitter<cardType>();

  constructor() { }

  ngOnInit(): void {
  }

  revealCard(): void {
    this.card.revealed = true;
    this.cardSelected.emit(this.card.type);
  }
}
