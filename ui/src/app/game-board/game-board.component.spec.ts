import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameBoardComponent} from './game-board.component';
import SpyObj = jasmine.SpyObj;
import {NounService} from '../services/noun/noun.service';
import {getMockNounService} from '../mocks/noun.service.mock';
import nouns from '../services/noun/nouns';
import {cardType} from '../models/card-type-enum';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let mockNounService: SpyObj<NounService>;

  beforeEach(() => {
    mockNounService = getMockNounService();
    component = new GameBoardComponent(mockNounService);
    mockNounService.getRandomNouns.and.returnValues(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
      '18', '19', '20', '21', '22', '23', '24', '25']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.ngOnInit', () => {
    it(`should fill the card array`, () => {
      component.ngOnInit();

      expect(component.cards.length).toBe(component.numOfCards);
      component.cards.forEach(card => expect(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23', '24', '25']).toContain(card.noun));
    });

  });

  describe('.generateRandomCardTypes', () => {
    it('should include assassins', () => {
      // given
      // when
      const result = component.generateRandomCardTypes(5, 2, 0, 0, 0)
        .filter(r => r === cardType.assassin);
      // then
      expect(result.length).toBe(2);
    });

    it('should include bystanders', () => {
      // given
      // when
      const result = component.generateRandomCardTypes(5, 0, 2, 0, 0)
        .filter(r => r === cardType.bystander);
      // then
      expect(result.length).toBe(2);
    });

    it('should include minimum red', () => {
      // given
      // when
      const result = component.generateRandomCardTypes(5, 0, 0, 2, 0)
        .filter(r => r === cardType.red);
      // then
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    it('should include minimum blue', () => {
      // given
      // when
      const result = component.generateRandomCardTypes(5, 0, 0, 0, 2)
        .filter(r => r === cardType.blue);
      // then
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    it('should have total cards', () => {
      // when
      const result = component.generateRandomCardTypes(5, 1, 1, 1, 1);
      // then
      expect(result.length).toBe(5);
    })
  });
});
