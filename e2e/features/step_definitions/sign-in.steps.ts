import { SignInPage } from '../page_objects/sign-in.page';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

module.exports = function () {

  let page: SignInPage = new SignInPage();

  this.Then(/^I should see the sign-in message$/, () => {
    return expect(page.getMessage())
      .to.eventually.contain('Welcome to the Meal Planner');
  });
}
