import { MealOrganiserPage } from './app.po';

describe('meal-organiser App', function() {
  let page: MealOrganiserPage;

  beforeEach(() => {
    page = new MealOrganiserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
