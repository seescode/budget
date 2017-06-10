import { browser, element, by, ElementFinder, promise } from 'protractor';

export class CreateBudgetPage {

  navigateTo() {
    return browser.get('/create-budget');
  }

  getCreateBudgetButton() {
    return element(by.css('#create-budget'));
  }
}
