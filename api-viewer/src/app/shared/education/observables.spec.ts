import {fakeAsync, flush, tick} from '@angular/core/testing';
import 'jasmine-marbles';
import {cold, getTestScheduler, initTestScheduler, setupEnvironment} from 'jasmine-marbles';
import {EMPTY, interval, of, Subscription} from 'rxjs';
import {map, mapTo, share, tap} from 'rxjs/operators';
import {TestScheduler} from 'rxjs/testing';

describe(`observables`, function () {
    let subs: Subscription[];
    let testScheduler: TestScheduler;
    beforeEach(() => {
        subs = [];
        initTestScheduler();
        testScheduler = getTestScheduler();
    });

    describe(`cold observables`, function () {
        describe(`marble test`, function () {
            it(`should have a result of empty`, () => {
                // given
                const provider = EMPTY;
                const expected = cold('|');

                // when

                // then
                expect(provider).toBeObservable(expected);
            });
            it(`should have result of 'a|'`, () => {
                // given
                const provider = of('a');
                const expected = cold('(a|)');

                // when

                // then
                expect(provider).toBeObservable(expected);

            });
        });
        it(`should output certain values`, () => {
            // given
            testScheduler.run(({cold, hot, expectObservable, expectSubscriptions, flush}) => {
                // given
                const obs$ = interval(500).pipe(map(x => x + 1));
                const expected1 = '500ms 1 499ms 2 499ms 3';
                const values = [0, 1, 2, 3];
                const unsub = '- 1500ms !';

                // when

                // then
                expectObservable(obs$, unsub).toBe(expected1, values);
            });
        });
    });

    describe(`hot observables`, function () {
        it(`should output certain values`, fakeAsync(() => {
            // given
            const obs$ = interval(500).pipe(map(x => x + 1), share());
            const result1 = [];
            const result2 = [];

            // when
            const sub1 = obs$.subscribe(x => result1.push(x));
            tick(500);
            const sub2 = obs$.subscribe(x => result2.push(x));
            tick(1000);
            sub1.unsubscribe();
            tick(500);
            sub2.unsubscribe();

            // then
            expect(result1).toEqual([1, 2, 3]);
            expect(result2).toEqual([2, 3, 4]);
        }));
    });

    describe(`*adder() - iterable function`, function () {
        let tally: Generator<number, number, unknown>;

        beforeEach(() => {
            tally = adder();
        });


        describe(`using .next()`, function () {
            it(`should be done`, () => {
                // given
                let result: IteratorResult<number>;

                // when
                tally.next(1); // argument will be ignored

                // then
                result = tally.next('done');
                expect(result.done).toEqual(true);
            });
            it(`should output the incorrect value (2) instead of (3) with .value`, () => {
                // given
                let result: IteratorResult<number>;

                // when
                tally.next(1); // argument will be ignored
                tally.next(1);

                // then
                result = tally.next('done');
                expect(result.value).toEqual(2);
            });
            it(`should output the incorrect value (1) instead of (2) with .value`, () => {
                // given
                let result: IteratorResult<number>;

                // when
                tally.next(1); // argument will be ignored

                // then
                result = tally.next('done');
                expect(result.value).toEqual(1);
            });
            it(`should output the incorrect answer`, () => {
                // given
                let result: IteratorResult<number>;

                // when
                tally.next(0.1); // argument will be ignored
                tally.next(0.1);
                tally.next(0.1);

                // then
                result = tally.next('done');
                expect(result.value).not.toEqual(.3);
            });
        });
        describe(`using .return()`, function () {
            it(`should be done`, () => {
                // given
                tally.next(1);

                // when
                const result = tally.return(5);

                // then
                expect(result.done).toEqual(true);
            });

            it(`should output a value after using .next()`, () => {
                // given
                tally.next(1);

                // when
                const result = tally.return(5);

                // then
                expect(result.value).toEqual(5);
            });
            it(`should output something`, () => {
                // given

                // when
                const result = tally.return(5);

                // then
                expect(result.value).toEqual(5);
            });
        });
    });

    describe(`null coalescing`, function () {
        let obj: any;
        beforeEach(() => {
            obj = {
                zeroValue: 0,
                nullValue: null,
                emptyValue: '',
                undefinedValue: undefined
            };
        });
        it(`should handle zero appropriately`, () => {
            // given

            // when
            const value = obj.zeroValue ?? 'hello';

            // then
            expect(value).toEqual(0);
        });
        it(`should handle null appropriately`, () => {
            // given

            // when
            const value = obj.nullValue ?? 'hello';

            // then
            expect(value).toEqual('hello');
        });
        it(`should handle empty appropriately`, () => {
            // given

            // when
            const value = obj.emptyValue ?? 'hello';

            // then
            expect(value).toEqual('');
        });

        it(`should handle undefined appropriately`, () => {
            // given

            // when
            const value = obj.undefinedValue ?? 'hello';

            // then
            expect(value).toEqual('hello');
        });
    });

    describe(`optional chaining`, function () {
        let obj: any;
        beforeEach(() => {
        });

        it(`should result in undefined`, () => {
            // given
            obj = {
                myThing: null
            };

            // when
            const result = obj.myThing?.someVal;

            // then
            expect(result).toEqual(undefined);
        });

        it(`should result in '3'`, () => {
            // given
            obj = {
                myThing: {
                    someVal: '3'
                }
            };

            // when
            const result = obj.myThing?.someVal;

            // then
            expect(result).toEqual('3');
        });
    });

});

function* adder(total = 0) {
    let increment = 1;
    let request;
    while (true) {
        switch (request = yield total += increment) {
            case undefined:
                break;
            case 'done':
                return total;
            default:
                increment = Number(request);
        }
    }
}
