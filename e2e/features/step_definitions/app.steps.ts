import { MealPlannerPage } from '../page_objects/app.page';

const chai = require('chai').use(require('chai-as-promised')),
  { defineSupportCode } = require('cucumber'),
  expect = chai.expect;

defineSupportCode(function({Given, When, Then}) {

  const page: MealPlannerPage = new MealPlannerPage();

  Given(/^an anonymous user$/, (done) => {
    done();
  });

  When(/^I click the (.*) button$/, (buttonName) => {
    return page.clickButton(buttonName);
  });

  Then(/^I should see the (.*) button$/, (buttonName) => {
    return expect(page.isButtonVisible(buttonName)).to.eventually.equal(true);
  });
});
