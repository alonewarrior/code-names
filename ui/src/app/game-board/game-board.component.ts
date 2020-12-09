import {Component, OnInit} from '@angular/core';
import {ICard} from '../models/ICard';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  tempCard: ICard = {
    noun: 'fiddlesticks',
    type: 'red',
    revealed: false,
    revealedImage: 'none'
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
