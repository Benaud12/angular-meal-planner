import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class ScenarioService {

  private _default: string = '_default';

  constructor(private location: Location) {
  }

  get name(): string {
    const path = this.location.path(),
      queryStringIndex = path.search(/\?.*scenario=.*/);
    if (queryStringIndex !== -1) {
      return path.substr(queryStringIndex + 1)
        .split('&')
        .map(pair => pair.split('='))
        .find(pair => pair[0] === 'scenario')[1]
    }
  }

  get default(): string {
    return this._default;
  }
}

