import {Component, OnInit} from '@angular/core';
import {ICard} from '../models/ICard';
import {NounService} from '../services/noun/noun.service';

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

  cards: ICard[] = [];
  numOfCards = 25;
  numberOfAssassins: 1;
  numberOfBystanders: 7;
  numberOfRed: 7;
  numberOfBlue: 7;

  constructor(private nounService: NounService) {
  }

  ngOnInit(): void {
    this.cards = this.nounService.getRandomNouns(25).map( noun =>
    {
      return {
        noun: noun
      } as unknown as ICard;
    });

    console.log(this.cards);
  }


}
