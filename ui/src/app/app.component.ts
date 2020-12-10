import {Component, OnInit} from '@angular/core';
import {CardType} from './models/card-type-enum';
import {ICard} from './models/ICard';
import {GameService} from './services/game/game.service';
import {NounService} from './services/noun/noun.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Codenames';
  message = `Welcome to non-copyright infringement Codenames! Click on "New Game" to start.`;
  keyVisible = false;
  cards: ICard[] = [];

  numOfCards = 25;
  numOfAssassins = 1;
  numOfBystanders = 7;
  numOfAgents = 8;
  isGameOver = false;

  currentTurn: CardType.red | CardType.blue;

  constructor(private nounService: NounService, private gameService: GameService) {
  }

  ngOnInit(): void {
  }

  newGame(): void {
    this.cards = this.gameService.generateCards(this.nounService.getRandomNouns(this.numOfCards), this.numOfAssassins,
      this.numOfBystanders, this.numOfAgents);
    this.currentTurn = this.gameService.findStartingTeam(this.cards);
    this._setCurrentTurnMessage();
    this.isGameOver = false;
  }

  toggleKey(): void {
    this.keyVisible = !this.keyVisible;
  }

  cardSelected($event: CardType): void {
    if ($event === CardType.assassin) {
      this.message = `${this.currentTurn} team loses`;
      this.isGameOver = true;
    }
    if ($event === CardType.bystander || $event === null || $event === CardType.red || $event === CardType.blue) {
      const shouldFlipTurn = this._shouldFlipTurn($event);
      this.currentTurn = (this.currentTurn === CardType.blue && shouldFlipTurn) || (this.currentTurn === CardType.red && !shouldFlipTurn) ? CardType.red : CardType.blue;
      this._setCurrentTurnMessage();
    }
    if ($event === CardType.blue || $event === CardType.red) {
      if (this.cards.filter(c => c.revealed === false && c.type === $event).length === 0) {
        this.message = `Game Over. ${$event} team wins!`;
        // this.isGameOver = true;
      }
    }
  }

  private _shouldFlipTurn(cardType: CardType): boolean {
    return (this.currentTurn === CardType.blue && cardType !== CardType.blue) || (this.currentTurn === CardType.red && cardType !== CardType.red);
  }

  private _setCurrentTurnMessage() {
    this.message = `${this.currentTurn} team's turn`;
  }
}
