import { HeaderElement } from '../element_objects/header.element';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

module.exports = function () {

  let header: HeaderElement = new HeaderElement();

  this.Then(/^I should see the header$/, () => {
    return expect(header.isPresent()).to.eventually.equal(true);
  });

  this.Then(/^the header should display the brand name$/, () => {
    return expect(header.getTitle()).to.eventually.equal('Meal Planner');
  });
}
