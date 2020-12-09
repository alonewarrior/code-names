import {GameService} from './game.service';
import {cardType} from '../../models/card-type-enum';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.generateRandomCardTypes', () => {
    it('should include assassins', () => {
      // given
      // when
      const result = service.generateRandomCardTypes(5, 2, 0, 0)
        .filter(r => r === cardType.assassin);
      // then
      expect(result.length).toBe(2);
    });

    it('should include bystanders', () => {
      // given
      // when
      const result = service.generateRandomCardTypes(5, 0, 2, 0)
        .filter(r => r === cardType.bystander);
      // then
      expect(result.length).toBe(2);
    });

    it('should include minimum red', () => {
      // given
      // when
      const result = service.generateRandomCardTypes(5, 0, 0, 2)
        .filter(r => r === cardType.red);
      // then
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    it('should include minimum blue', () => {
      // given
      // when
      const result = service.generateRandomCardTypes(5, 0, 0, 2)
        .filter(r => r === cardType.blue);
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
