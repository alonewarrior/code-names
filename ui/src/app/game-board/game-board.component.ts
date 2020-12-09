import {Component, Input, OnInit} from '@angular/core';
import {ICard} from '../models/ICard';
import {NounService} from '../services/noun/noun.service';
import {cardType} from '../models/card-type-enum';
import {GameService} from '../services/game/game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() showKeys = false;
  @Input() cards: ICard[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }



}
