import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {getMockNounService} from './mocks/noun.service.mock';
import {getMockGameService} from './mocks/game.service.mock';
import {cardType} from './models/card-type-enum';
import {ICard} from './models/ICard';

describe('AppComponent', () => {

  let app: AppComponent;
  let mockNounService;
  let mockGameService;
  const mockNouns = ['Doug', 'Ethan', 'LienPockets', 'jeans'];
  const mockGameCards = [
    {
      noun: 'Doug',
      type: cardType.assassin,
      revealed: false,
      revealedImage: ''
    },
    {
      noun: 'Ethan',
      type: cardType.bystander,
      revealed: false,
      revealedImage: ''
    },
    {
      noun: 'LienPockets',
      type: cardType.red,
      revealed: false,
      revealedImage: ''
    },
    {
      noun: 'jeans',
      type: cardType.blue,
      revealed: false,
      revealedImage: ''
    }
  ] as ICard[];


  beforeEach(() => {
    mockNounService = getMockNounService();
    mockGameService = getMockGameService();
    app = new AppComponent(mockNounService, mockGameService);
    mockNounService.getRandomNouns.and.returnValues(mockNouns);
    mockGameService.generateCards.and.returnValues(mockGameCards);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Codenames'`, () => {
    expect(app.title).toEqual('Codenames');
  });

  describe('.newGame', () => {
    it(`should fill the card array`, () => {


      app.numOfAgents = 1;
      app.numOfAssassins = 1;
      app.numOfBystanders = 1;
      app.numOfCards = 4;
      app.ngOnInit();

      expect(app.cards.length).toBe(app.numOfCards);
      app.cards.forEach(card => expect(mockNouns).toContain(card.noun));
    });

  });


});
