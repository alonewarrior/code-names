import {Injectable} from '@angular/core';
import {CardType} from '../../models/card-type-enum';
import {ICard} from '../../models/ICard';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() {
  }

  findStartingTeam(cards: ICard[]): CardType.red | CardType.blue {
    const redCards = cards.filter(c => c.type === CardType.red);
    const blueCards = cards.filter(c=> c.type === CardType.blue);
    return redCards.length > blueCards.length ? CardType.red : CardType.blue;
  }

  generateCards(nouns: string[], assassins: number, bystanders: number, agents: number): ICard[] {
    const randomTypes = this.generateRandomCardTypes(nouns.length, assassins, bystanders, agents);
    return nouns.map(noun => {
      return {
        noun,
        type: randomTypes.pop(),
        revealed: false,
        revealedImage: ''
      } as ICard;
    });
  }

  generateRandomCardTypes(totalCards: number, assassins: number, bystanders: number, agents: number): string[] {
    let result: string[] = [];

    // add assassins
    result = result.concat(Array.from({length: assassins}).fill(CardType.assassin) as string[]);

    // add bystanders
    result = result.concat(Array.from({length: bystanders}).fill(CardType.bystander) as string[]);

    // add red
    result = result.concat(Array.from({length: agents}).fill(CardType.red) as string[]);

    // add blue
    result = result.concat(Array.from({length: agents}).fill(CardType.blue) as string[]);

    while (result.length < totalCards) {
      // add random red/blue
      result.push(Math.random() < 0.5 ? CardType.red : CardType.blue);
    }

    // we have all the request types, now shuffle them up
    result.sort(() => Math.random() - 0.5);

    return result;
  }

}
