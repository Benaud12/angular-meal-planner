import { SignInPage } from '../page_objects/sign-in.page';
import { MealPlannerPage } from '../page_objects/app.page';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

module.exports = function () {

  let page: SignInPage = new SignInPage();
  let appPage: MealPlannerPage = new MealPlannerPage();

  this.Then(/^I should see the sign-in message$/, () => {
    return expect(page.getMessage())
      .to.eventually.contain('Welcome to the Meal Planner');
  });

  this.Then(/^I should see the Log In input fields$/, () => {
    return page.getAllLogInInputElements().each((element) => {
      return expect(appPage.isElementVisible(element))
        .to.eventually.equal(true);
    });
  });

  this.Then(/^I should not see the Log In input fields$/, () => {
    return page.getAllLogInInputElements().each((element) => {
      return expect(appPage.isElementInvisible(element))
        .to.eventually.equal(true);
    });
  });

  this.Then(/^I should see the Sign Up input fields$/, () => {
    return page.getAllSignUpInputElements().each((element) => {
      return expect(appPage.isElementVisible(element))
        .to.eventually.equal(true);
    });
  });

  this.Then(/^I should not see the Sign Up input fields$/, () => {
    return page.getAllSignUpInputElements().each((element) => {
      return expect(appPage.isElementInvisible(element))
        .to.eventually.equal(true);
    });
  });
}
