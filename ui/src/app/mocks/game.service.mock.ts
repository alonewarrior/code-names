import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {GameService} from '../services/game/game.service';

export function getMockGameService(): SpyObj<GameService> {
  return createSpyObj('GameService', ['generateCards', 'generateRandomCardTypes']);
}
