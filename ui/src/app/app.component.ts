import {Component, OnInit} from '@angular/core';
import {NounService} from './services/noun/noun.service';
import {GameService} from './services/game/game.service';
import {ICard} from './models/ICard';

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

  constructor(private nounService: NounService, private gameService: GameService) {
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.cards = this.gameService.generateCards(this.nounService.getRandomNouns(this.numOfCards), this.numOfAssassins,
      this.numOfBystanders, this.numOfAgents);
  }


  toggleKey(): void {
    this.keyVisible = !this.keyVisible;
  }


}
