import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICard} from '../models/ICard';
import {CardType} from '../models/card-type-enum';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() showKeys = false;
  @Input() cards: ICard[] = [];
  @Input() isGameOver: boolean;
  @Output() cardSelected: EventEmitter<CardType> = new EventEmitter<CardType>();

  constructor() {
  }

  ngOnInit(): void {
  }

  aCardSelected($event: CardType): void {
    this.cardSelected.emit($event);
  }
}
