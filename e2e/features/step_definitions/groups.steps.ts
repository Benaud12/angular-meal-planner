import { GroupsPage } from '../page_objects/groups.page';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

module.exports = function () {

  let groupsPage: GroupsPage = new GroupsPage();

  this.Then(/^I should see the groups heading$/, () => {
    return expect(groupsPage.getHeading())
      .to.eventually.equal('Choose a group!');
  });
}
