import { browser, ExpectedConditions, element, by } from 'protractor';

export class BrowserHelper {
  baseUrl: string = browser.baseUrl;
  defaultTimeout: number = 5000;

  defaultWait(conditionFunction) {
    return browser.wait(conditionFunction, this.defaultTimeout);
  }

  get(url) {
    return browser.get(this.baseUrl + url);
  }

  waitForExpectedUrl(expectedUrl) {
    return this.defaultWait(
      ExpectedConditions.urlIs(this.baseUrl + expectedUrl));
  }

  waitForElementToBeVisible(elementFinder) {
    return this.defaultWait(ExpectedConditions.visibilityOf(elementFinder));
  }
}
