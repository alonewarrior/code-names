import {CardType} from '../../models/card-type-enum';
import {ICard} from '../../models/ICard';
import {GameService} from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`.findStartingTeam()`, () => {
    [
      {description: 'only a blue card', input: [{type: CardType.blue}], expected: CardType.blue},
      {description: 'only a red card', input: [{type: CardType.red}], expected: CardType.red},
      {description: 'one blue and two red', input: [{type: CardType.blue}, {type: CardType.red}, {type: CardType.red}], expected: CardType.red},
    ]
      .forEach((data) => {
        it(`should return the correct team - description (${data.description}), expected (${data.expected})`, () => {
          // given
          // when
          const result = service.findStartingTeam(data.input as ICard[]);

          // then
          expect(result).toEqual(data.expected);
        });
      })
  });

  describe('.generateRandomCardTypes()', () => {
    it('should include assassins', () => {
      // given
      // when
      const result = service.generateRandomCardTypes(5, 2, 0, 0)
        .filter(r => r === CardType.assassin);
      // then
      expect(result.length).toBe(2);
    });

    it('should include bystanders', () => {
      // given
      // when
      const result = service.generateRandomCardTypes(5, 0, 2, 0)
        .filter(r => r === CardType.bystander);
      // then
      expect(result.length).toBe(2);
    });

    it('should include minimum red', () => {
      // given
      // when
      const result = service.generateRandomCardTypes(5, 0, 0, 2)
        .filter(r => r === CardType.red);
      // then
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    it('should include minimum blue', () => {
      // given
      // when
      const result = service.generateRandomCardTypes(5, 0, 0, 2)
        .filter(r => r === CardType.blue);
      // then
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    it('should have total cards', () => {
      // when
      const result = service.generateRandomCardTypes(5, 1, 1, 1);
      // then
      console.log(result);
      expect(result.length).toBe(5);
    })
  });
});
