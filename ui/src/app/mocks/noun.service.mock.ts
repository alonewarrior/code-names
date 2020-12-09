import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {NounService} from '../services/noun/noun.service';

export function getMockNounService(): SpyObj<NounService> {
  return createSpyObj('NounService', ['getRandomNoun', 'getRandomNouns']);
}
