import { browser, element, by, ElementFinder, promise, ElementArrayFinder } from 'protractor';

export class BudgetListPage {

  navigateTo() {
    return browser.get('/');
  }

  getCreateBudgetButton() {
    return element(by.css('#create-budget'));
  }

  getOpenButtons() {
    return element.all(by.css('.open'));
  }
  
}
