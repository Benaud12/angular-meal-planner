import { MealPlannerPage } from '../page_objects/app.page';

const chai = require('chai').use(require('chai-as-promised')),
  { defineSupportCode } = require('cucumber'),
  expect = chai.expect;

defineSupportCode(function({Given, When, Then}) {

  const page: MealPlannerPage = new MealPlannerPage();

  Given(/^an anonymous user$/, function(done) {
    this.user = {
      username: 'Anon',
      email: 'anon@email.com',
      password: 'vaild_pass'
    };
    done();
  });

  When(/^I click the (.*) button$/, function(buttonName) {
    return page.clickButton(buttonName);
  });

  Then(/^I should see the (.*) button$/, function(buttonName) {
    return expect(page.isButtonVisible(buttonName)).to.eventually.equal(true);
  });
});
