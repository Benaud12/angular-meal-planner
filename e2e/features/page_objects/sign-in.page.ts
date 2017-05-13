import { element, by } from 'protractor';

export class SignInPage {
  tagName: string = 'mp-sign-in';

  getMessage() {
    return element(by.css(this.tagName + ' > h2')).getText();
  }

  getAllLoginInputElements() {
    return element.all(by.css(this.tagName + ' mp-login input'));
  }

  getAllSignUpInputElements() {
    return element.all(by.css(this.tagName + ' mp-sign-up input'));
  }
}
