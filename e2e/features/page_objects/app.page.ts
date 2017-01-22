import { BrowserHelper } from '../util/browser.helper'
import { element, by, ElementFinder } from 'protractor';

export class MealPlannerPage {
  browserHelper: BrowserHelper = new BrowserHelper();

  isButtonVisible(buttonName: string) {
    return this.browserHelper
      .waitForElementToBeVisible(element(by.buttonText(buttonName)));
  }

  isElementVisible(element: ElementFinder) {
    return this.browserHelper.waitForElementToBeVisible(element);
  }

  isElementInvisible(element: ElementFinder) {
    return this.browserHelper.waitForElementToBeInvisible(element);
  }

  clickButton(buttonName: string) {
    return element(by.buttonText(buttonName)).click();
  }
}
