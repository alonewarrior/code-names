import {AppComponent} from './app.component';
import {getMockGameService} from './mocks/game.service.mock';
import {getMockNounService} from './mocks/noun.service.mock';
import {CardType} from './models/card-type-enum';
import {ICard} from './models/ICard';
import {GameService} from './services/game/game.service';
import {NounService} from './services/noun/noun.service';
import SpyObj = jasmine.SpyObj;

describe('AppComponent', () => {

  let component: AppComponent;
  let mockNounService: SpyObj<NounService>;
  let mockGameService: SpyObj<GameService>;
  const mockNouns = ['Doug', 'Ethan', 'LienPockets', 'jeans', 'RedNoun', 'BlueNoun'];
  const mockGameCards = [
    {
      noun: 'Doug',
      type: CardType.assassin,
      revealed: false,
      revealedImage: ''
    },
    {
      noun: 'Ethan',
      type: CardType.bystander,
      revealed: false,
      revealedImage: ''
    },
    {
      noun: 'LienPockets',
      type: CardType.red,
      revealed: false,
      revealedImage: ''
    },
    {
      noun: 'RedNoun',
      type: CardType.red,
      revealed: false,
      revealedImage: ''
    },
    {
      noun: 'jeans',
      type: CardType.blue,
      revealed: false,
      revealedImage: ''
    },
    {
      noun: 'BlueNoun',
      type: CardType.blue,
      revealed: false,
      revealedImage: ''
    }
  ] as ICard[];


  beforeEach(() => {
    mockNounService = getMockNounService();
    mockGameService = getMockGameService();
    component = new AppComponent(mockNounService, mockGameService);
    mockNounService.getRandomNouns.and.returnValues(mockNouns);
    mockGameService.generateCards.and.returnValues(mockGameCards);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Codenames'`, () => {
    expect(component.title).toEqual('Codenames');
  });

  describe('.newGame()', () => {
    it(`should fill the card array`, () => {
      component.numOfAgents = 2;
      component.numOfAssassins = 1;
      component.numOfBystanders = 1;
      component.numOfCards = 6;
      component.newGame();

      expect(component.cards.length).toBe(component.numOfCards);
      component.cards.forEach(card => expect(mockNouns).toContain(card.noun));
    });
    it(`should set .currentTurn to blue team when gameService.findStartingTeam() returns CardType.blue`, () => {
      // given
      mockGameService.findStartingTeam.withArgs(mockGameCards).and.returnValue(CardType.blue);

      // when
      component.newGame();

      // then
      expect(component.currentTurn).toEqual(CardType.blue);
    });

    it(`should set .currentTurn to red team when gameService.findStartingTeam() returns CardType.red`, () => {
      // given
      mockGameService.findStartingTeam.withArgs(mockGameCards).and.returnValue(CardType.red);

      // when
      component.newGame();

      // then
      expect(component.currentTurn).toEqual(CardType.red);
    });

    it(`should set .message to 'Blue team's turn' team when gameService.findStartingTeam() returns CardType.blue`, () => {
      // given
      mockGameService.findStartingTeam.withArgs(mockGameCards).and.returnValue(CardType.blue);

      // when
      component.newGame();

      // then
      expect(component.message).toEqual(`Blue team's turn`);
    });

    it(`should set .message to 'Red team's turn' team when gameService.findStartingTeam() returns CardType.red`, () => {
      // given
      mockGameService.findStartingTeam.withArgs(mockGameCards).and.returnValue(CardType.red);

      // when
      component.newGame();

      // then
      expect(component.message).toEqual(`Red team's turn`);
    });

    it(`should set .isGameOver to false`, () => {
      // given
      component.isGameOver = true;

      // when
      component.newGame();

      // then
      expect(component.isGameOver).toEqual(false);
    });

  });

  describe(`.cardSelected()`, () => {
    beforeEach(() => {
      component.cards = mockGameCards;
    });

    it(
      `should set .message to 'Blue team loses' when .currentTeam equal CardType.blue and CardType.assassin is passed in`,
      () => {
        // given
        component.currentTurn = CardType.blue;

        // when
        component.cardSelected(CardType.assassin);

        // then
        expect(component.message).toEqual('Blue team loses');
      });
    it(
      `should set .message to 'Red team loses' when .currentTeam equal CardType.red and CardType.assassin is passed in`,
      () => {
        // given
        component.currentTurn = CardType.red;

        // when
        component.cardSelected(CardType.assassin);

        // then
        expect(component.message).toEqual('Red team loses');
      });

    it(
      `should set .isGameOver to true when CardType.assassin is passed in`,
      () => {
        // given
        component.currentTurn = CardType.red;

        // when
        component.cardSelected(CardType.assassin);

        // then
        expect(component.isGameOver).toEqual(true);
      });
    [
      {currentTurn: CardType.red, valuePassedIn: CardType.bystander, expected: CardType.blue},
      {currentTurn: CardType.blue, valuePassedIn: CardType.bystander, expected: CardType.red},
      {currentTurn: CardType.red, valuePassedIn: null, expected: CardType.blue},
      {currentTurn: CardType.blue, valuePassedIn: null, expected: CardType.red},
      {currentTurn: CardType.blue, valuePassedIn: CardType.red, expected: CardType.red},
      {currentTurn: CardType.red, valuePassedIn: CardType.blue, expected: CardType.blue},
      {currentTurn: CardType.blue, valuePassedIn: CardType.blue, expected: CardType.blue},
      {currentTurn: CardType.red, valuePassedIn: CardType.red, expected: CardType.red},
    ]
      .forEach((data) => {
        it(
          `should correctly set .currentTeam - currentTurn (${data.currentTurn}), valuePassedIn (${data.valuePassedIn}), expected (${data.expected})`,
          () => {
            // given
            component.currentTurn = data.currentTurn as CardType.red | CardType.blue;

            // when
            component.cardSelected(data.valuePassedIn);

            // then
            expect(component.currentTurn).toEqual(data.expected);
          });
      });

    [
      {currentTurn: CardType.red, valuePassedIn: CardType.bystander, expected: `Blue team's turn`},
      {currentTurn: CardType.blue, valuePassedIn: CardType.bystander, expected: `Red team's turn`},
      {currentTurn: CardType.red, valuePassedIn: null, expected: `Blue team's turn`},
      {currentTurn: CardType.blue, valuePassedIn: null, expected: `Red team's turn`},
      {currentTurn: CardType.blue, valuePassedIn: CardType.red, expected: `Red team's turn`},
      {currentTurn: CardType.red, valuePassedIn: CardType.blue, expected: `Blue team's turn`},
      {currentTurn: CardType.blue, valuePassedIn: CardType.blue, expected: `Blue team's turn`},
      {currentTurn: CardType.red, valuePassedIn: CardType.red, expected: `Red team's turn`},
    ]
      .forEach((data) => {
        it(
          `should correctly set .message on turn changes - currentTurn (${data.currentTurn}), valuePassedIn (${data.valuePassedIn}), expected (${data.expected})`,
          () => {
            // given
            component.currentTurn = data.currentTurn as CardType.red | CardType.blue;

            // when
            component.cardSelected(data.valuePassedIn);

            // then
            expect(component.message).toEqual(data.expected);
          });
      });
  });

});
