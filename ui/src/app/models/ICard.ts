import {cardType} from './card-type-enum';

export interface ICard {
  noun: string;
  type: cardType;
  revealed: boolean;
  revealedImage: string;
}
