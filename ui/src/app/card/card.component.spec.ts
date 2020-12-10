import {CardComponent} from './card.component';
import {ICard} from '../models/ICard';
import {CardType} from '../models/card-type-enum';

describe('CardComponent', () => {
  let component: CardComponent;
  let card: ICard;

  beforeEach(() => {
    component = new CardComponent();
    card = {
      noun: 'fiddlesticks',
      type: CardType.red,
      revealed: false,
      revealedImage: 'none'
    };

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.revealCard()', () => {
    it(`should set .card.revealed to true`, () => {
      component.card = card;

      // when
      component.revealCard();

      // then
      expect(component.card.revealed).toBeTrue();
    });

    it(`should not set .card.revealed to true when .disabled is true`, () => {
      component.disabled = true;
      component.card = card;

      // when
      component.revealCard();

      // then
      expect(component.card.revealed).toBeFalse();
    });

  });
});
