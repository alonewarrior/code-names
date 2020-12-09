import {GameBoardComponent} from './game-board.component';
import {NounService} from '../services/noun/noun.service';
import {getMockNounService} from '../mocks/noun.service.mock';
import {cardType} from '../models/card-type-enum';
import SpyObj = jasmine.SpyObj;

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;

  beforeEach(() => {
    component = new GameBoardComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
