import { BrowserHelper } from '../util/browser.helper'
import { element, by } from 'protractor';

export class HeaderElement {
  browserHelper: BrowserHelper = new BrowserHelper();
  tagName: string = 'mp-header';

  isPresent() {
    return this.browserHelper
      .waitForElementToBeVisible(element(by.tagName(this.tagName)));
  }

  getTitle() {
    return element(by.css(this.tagName + ' > h2')).getText();
  }
}
