import { MealPlannerPage } from '../page_objects/app.page';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

module.exports = function () {

  let page: MealPlannerPage = new MealPlannerPage();

  this.Given(/^an anonymous user$/, () => {
    return;
  });

  this.When(/^I click the (.*) button$/, (buttonName) => {
    return page.clickButton(buttonName);
  });

  this.Then(/^I should see the (.*) button$/, (buttonName) => {
    return expect(page.isButtonVisible(buttonName)).to.eventually.equal(true);
  });
}
