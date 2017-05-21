import { LoginBrowserPage } from '../page_objects/login.page';
import { MealPlannerPage } from '../page_objects/app.page';

const chai = require('chai').use(require('chai-as-promised')),
  { defineSupportCode } = require('cucumber'),
  expect = chai.expect;

defineSupportCode(function({Then}) {

  let page: LoginBrowserPage = new LoginBrowserPage();
  let appPage: MealPlannerPage = new MealPlannerPage();

  Then(/^I should see the login message$/, () => {
    return expect(page.getMessage())
      .to.eventually.contain('Welcome to the Meal Planner');
  });

  Then(/^I should see the Log In input fields$/, () => {
    return page.getAllLoginInputElements().each((element) => {
      return expect(appPage.isElementVisible(element))
        .to.eventually.equal(true);
    });
  });

  Then(/^I should not see the Log In input fields$/, () => {
    return page.getAllLoginInputElements().each((element) => {
      return expect(appPage.isElementInvisible(element))
        .to.eventually.equal(true);
    });
  });

  Then(/^I should see the Sign Up input fields$/, () => {
    return page.getAllSignUpInputElements().each((element) => {
      return expect(appPage.isElementVisible(element))
        .to.eventually.equal(true);
    });
  });

  Then(/^I should not see the Sign Up input fields$/, () => {
    return page.getAllSignUpInputElements().each((element) => {
      return expect(appPage.isElementInvisible(element))
        .to.eventually.equal(true);
    });
  });
});
