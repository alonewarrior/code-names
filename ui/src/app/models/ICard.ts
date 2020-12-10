import {CardType} from './card-type-enum';

export interface ICard {
  noun: string;
  type: CardType;
  revealed: boolean;
  revealedImage: string;
}
