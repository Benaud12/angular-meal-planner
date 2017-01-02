import { BrowserHelper } from '../util/browser.helper';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

module.exports = function () {

  let browserHelper: BrowserHelper = new BrowserHelper();

  this.When(/^I open the app$/, () => {
    browserHelper.get('');
  });

  this.When(/^I open the (.*) page$/, (url) => {
    browserHelper.get(url);
  });

  this.Then(/^I should be redirected to the (.*) page$/, (url) => {
    return expect(browserHelper
      .waitForExpectedUrl(url)).to.eventually.equal(true);
  });
}
