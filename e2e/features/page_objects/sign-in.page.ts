import { element, by } from 'protractor';

export class SignInPage {
  tagName: string = 'mp-sign-in';

  getMessage () {
    return element(by.css(this.tagName + ' > h2')).getText();
  }
}
