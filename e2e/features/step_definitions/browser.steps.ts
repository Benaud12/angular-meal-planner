import { BrowserHelper } from '../util/browser.helper';

const chai = require('chai').use(require('chai-as-promised')),
  { defineSupportCode } = require('cucumber'),
  expect = chai.expect;

defineSupportCode(function({When, Then}) {

  const browserHelper: BrowserHelper = new BrowserHelper();

  When(/^I open the app$/, () => {
    return browserHelper.get('');
  });

  When(/^I open the (.*) page$/, (url) => {
    return browserHelper.get(url);
  });

  Then(/^I should be redirected to the (.*) page$/, (url) => {
    return expect(browserHelper
      .waitForExpectedUrl(url)).to.eventually.equal(true);
  });
});
