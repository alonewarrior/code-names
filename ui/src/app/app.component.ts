import {Component} from '@angular/core';
import {ICard} from './models/ICard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ui';
  message = `Welcome to non-copyright infringement Codenames! Click on "New Game" to start.`;

  tempCard: ICard = {
    noun: 'fiddlesticks',
    type: 'red',
    revealed: false,
    revealedImage: 'none'
  };
}
