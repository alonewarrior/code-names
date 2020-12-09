import {CardComponent} from './card.component';
import {ICard} from '../models/ICard';
import {cardType} from '../models/card-type-enum';

describe('CardComponent', () => {
  let component: CardComponent;
  let card: ICard;



  beforeEach(() => {
    component = new CardComponent();

    card = {
      noun: 'fiddlesticks',
      type: cardType.red,
      revealed: false,
      revealedImage: 'none'
    };

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('revealCard', () => {
    it(`should set the revealed of the card to true`, () => {
      component.card = card;

      // when
      component.revealCard();

      // then
      expect(component.card.revealed).toBeTrue();
    });

  });
});
