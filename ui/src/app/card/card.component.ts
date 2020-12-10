import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICard} from '../models/ICard';
import {CardType} from '../models/card-type-enum';

// @ts-ignore
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: ICard;
  @Input() showKey: boolean;
  @Input() disabled: boolean;
  @Output() cardSelected: EventEmitter<CardType> = new EventEmitter<CardType>();

  constructor() { }

  ngOnInit(): void {
  }

  revealCard(): void {
    if (!this.disabled) {
      this.card.revealed = true;
      this.cardSelected.emit(this.card.type);
    }
  }
}
