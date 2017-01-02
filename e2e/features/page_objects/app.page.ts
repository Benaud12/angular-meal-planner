import { browser, element, by } from 'protractor';

export class MealPlannerPage {
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
