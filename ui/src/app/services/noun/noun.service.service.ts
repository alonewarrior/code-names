import { Injectable } from '@angular/core';
import nouns from './nouns';

@Injectable({
  providedIn: 'root'
})
export class NounService {

  constructor() { }

  getRandomNouns(count: number): string[] {
    const results: string[] = [];

    while (results.length < count) {
      const newNoun = this.getRandomNoun();
      if (!results.includes(newNoun)) {
        results.push(newNoun);
      }
    }

    return results;
  }

  getRandomNoun(): string {
    return nouns.nouns[Math.floor(Math.random() * nouns.nouns.length)];
  }
}
