import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICard} from '../models/ICard';
import {cardType} from '../models/card-type-enum';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() showKeys = false;
  @Input() cards: ICard[] = [];
  @Output() cardSelected: EventEmitter<cardType> = new EventEmitter<cardType>();

  constructor() {
  }

  ngOnInit(): void {
  }

  aCardSelected($event: cardType): void {
    this.cardSelected.emit($event);
  }
}
