import { browser, element, by } from 'protractor';

export class BudgetListPage {

  navigateTo() {
    return browser.get('/');
  }

  getCreateBudgetButton() {
    return element(by.css('#create-budget'));
  }
}
