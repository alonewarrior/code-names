import {Component} from '@angular/core';
import {ICard} from './models/ICard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ui';

  tempCard: ICard = {
    noun: 'fiddlesticks',
    type: 'red',
    revealed: false,
    revealedImage: 'none'
  };
}
