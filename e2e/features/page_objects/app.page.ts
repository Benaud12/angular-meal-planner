import { BrowserHelper } from '../util/browser.helper'
import { element, by } from 'protractor';

export class MealPlannerPage {
  browserHelper: BrowserHelper = new BrowserHelper();

  isButtonVisible(buttonName: string) {
    return this.browserHelper
      .waitForElementToBeVisible(element(by.buttonText(buttonName)));
  }
}
