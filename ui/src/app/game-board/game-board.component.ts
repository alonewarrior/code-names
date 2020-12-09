import {Component, OnInit} from '@angular/core';
import {ICard} from '../models/ICard';
import {NounService} from '../services/noun/noun.service';
import {cardType} from '../models/card-type-enum';

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

  generateRandomCardTypes(totalCards: number, assassins: number, bystanders: number, red: number, blue: number): string[] {
    let result: string[] = [];

    // add assassins
    result = result.concat(Array.from({ length: assassins }).fill(cardType.assassin) as string[]);

    // add bystanders
    result = result.concat(Array.from({ length: bystanders }).fill(cardType.bystander) as string[]);

    // add red
    result = result.concat(Array.from({ length: red }).fill(cardType.red) as string[]);

    // add blue
    result = result.concat(Array.from({ length: blue }).fill(cardType.blue) as string[]);

    while (result.length < totalCards) {
      // add random red/blue
      result.push(Math.random() < 0.5 ? cardType.red : cardType.blue);
    }

    // we have all the request types, now shuffle them up
    result.sort(() => Math.random() - 0.5);

    return result;
  }
}
