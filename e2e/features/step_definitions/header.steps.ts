import { HeaderElement } from '../element_objects/header.element';

const chai = require('chai').use(require('chai-as-promised')),
  { defineSupportCode } = require('cucumber'),
  expect = chai.expect;

defineSupportCode(function({Then}) {

  const header: HeaderElement = new HeaderElement();

  Then(/^I should see the header$/, () => {
    return expect(header.isPresent()).to.eventually.equal(true);
  });

  Then(/^the header should display the brand name$/, () => {
    return expect(header.getTitle()).to.eventually.equal('Meal Planner');
  });
});
