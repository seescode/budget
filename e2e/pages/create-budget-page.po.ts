import { browser, element, by, ElementFinder, promise, protractor } from 'protractor';

export class CreateBudgetPage {

  navigateTo() {
    return browser.get('/create-budget');
  }

  getCreateBudgetButton() {
    return element(by.css('#create-budget'));
  }

  setBudgetName(text: string) {
    const item = element(by.css('.budget-name'));
    item.sendKeys(text);
  }

  setBudgetDetails(text: string) {
    const item = element(by.css('.details'));
    item.sendKeys(text);
  }

  setBudgetAmount(text: string) {
    const item = element(by.css('.budget-amount'));
    item.sendKeys(text);
  }

  setDate(month: string, year: string, id: string) {
    const monthElement = element(by.css(id));
    monthElement.sendKeys(month);
    monthElement.sendKeys(protractor.Key.TAB);
    monthElement.sendKeys(year);
  }

  createBudget(name: string, details: string, amount: string,
    startMonth: string, startYear: string, endMonth: string, endYear: string) {

    this.setBudgetName(name);
    this.setBudgetDetails(details);
    this.setBudgetAmount(amount);
    this.setDate(startMonth, startYear, '#budget-start');
    this.setDate(endMonth, endYear, '#budget-finish');

    const createBudgetPageCreateButton = this.getCreateBudgetButton();
    createBudgetPageCreateButton.click();
  }

}
