import {Injectable} from '@angular/core';
import {ICard} from '../../models/ICard';
import {cardType} from '../../models/card-type-enum';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() {
  }

  generateCards(nouns: string[], assassins: number, bystanders: number, agents: number): ICard[] {
    const randomTypes = this.generateRandomCardTypes(nouns.length, assassins, bystanders, agents);
    const cards = nouns.map(noun => {
      return {
        noun,
        type: randomTypes.pop(),
        revealed: false,
        revealedImage: ''
      } as ICard;
    });
    return cards;
  }

  generateRandomCardTypes(totalCards: number, assassins: number, bystanders: number, agents: number): string[] {
    let result: string[] = [];

    // add assassins
    result = result.concat(Array.from({length: assassins}).fill(cardType.assassin) as string[]);

    // add bystanders
    result = result.concat(Array.from({length: bystanders}).fill(cardType.bystander) as string[]);

    // add red
    result = result.concat(Array.from({length: agents}).fill(cardType.red) as string[]);

    // add blue
    result = result.concat(Array.from({length: agents}).fill(cardType.blue) as string[]);

    while (result.length < totalCards) {
      // add random red/blue
      result.push(Math.random() < 0.5 ? cardType.red : cardType.blue);
    }

    // we have all the request types, now shuffle them up
    result.sort(() => Math.random() - 0.5);

    return result;
  }

}
