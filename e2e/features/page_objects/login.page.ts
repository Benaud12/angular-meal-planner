import { element, by } from 'protractor';

export class LoginBrowserPage {
  tagName: string = 'mp-login-page';

  getMessage() {
    return element(by.css(`${this.tagName} > h2`)).getText();
  }

  getAllLoginInputElements() {
    return element.all(by.css(`${this.tagName} mp-login input`));
  }

  getAllSignUpInputElements() {
    return element.all(by.css(`${this.tagName} mp-sign-up input`));
  }

  inputSignUpField(text, fieldName) {
    return element(by.css(`${this.tagName} mp-sign-up`))
      .element(by.name(fieldName)).sendKeys(text);
  }
}
