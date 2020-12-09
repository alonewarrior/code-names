import { TestBed } from '@angular/core/testing';

import { NounService } from './noun.service.service';

describe('NounService', () => {
  let service: NounService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NounService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.getRandomNouns', () => {
    it('should return a number of nouns', () => {
      // when
      const result = service.getRandomNouns(3);

      // then
      expect(result.length).toBe(3);
    });
  });
});
