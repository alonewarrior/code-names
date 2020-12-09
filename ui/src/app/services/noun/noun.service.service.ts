import { Injectable } from '@angular/core';
import nouns from './nouns';

@Injectable({
  providedIn: 'root'
})
export class NounService {

  constructor() { }

  getRandomNouns(count: number): string[] {
      return nouns.nouns.slice(0, count);
  }
}
