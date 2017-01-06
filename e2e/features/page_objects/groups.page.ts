import { element, by } from 'protractor';

export class GroupsPage {
  tagName: string = 'mp-groups';

  getHeading() {
    return element(by.css(this.tagName + ' h2')).getText();
  }
}
