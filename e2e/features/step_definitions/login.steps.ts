import { LoginBrowserPage } from '../page_objects/login.page';
import { MealPlannerPage } from '../page_objects/app.page';

const chai = require('chai').use(require('chai-as-promised')),
  { defineSupportCode } = require('cucumber'),
  expect = chai.expect;

defineSupportCode(function({When, Then}) {

  let page: LoginBrowserPage = new LoginBrowserPage();
  let appPage: MealPlannerPage = new MealPlannerPage();

  When('I enter my sign up details', function() {
    return this.promiseSequencer(
      () => page.inputSignUpField(this.user.username, 'username'),
      () => page.inputSignUpField(this.user.email, 'email'),
      () => page.inputSignUpField(this.user.password, 'password'),
      () => page.inputSignUpField(this.user.password, 'password-confirm')
    );
  });

  Then(/^I should see the login message$/, function() {
    return expect(page.getMessage())
      .to.eventually.contain('Welcome to the Meal Planner');
  });

  Then(/^I should see the Log In input fields$/, function() {
    return page.getAllLoginInputElements().each((element) => {
      return expect(appPage.isElementVisible(element))
        .to.eventually.equal(true);
    });
  });

  Then(/^I should not see the Log In input fields$/, function() {
    return page.getAllLoginInputElements().each((element) => {
      return expect(appPage.isElementInvisible(element))
        .to.eventually.equal(true);
    });
  });

  Then(/^I should see the Sign Up input fields$/, function() {
    return page.getAllSignUpInputElements().each((element) => {
      return expect(appPage.isElementVisible(element))
        .to.eventually.equal(true);
    });
  });

  Then(/^I should not see the Sign Up input fields$/, function() {
    return page.getAllSignUpInputElements().each((element) => {
      return expect(appPage.isElementInvisible(element))
        .to.eventually.equal(true);
    });
  });
});
