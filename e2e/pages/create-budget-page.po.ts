import { BudgetingPage } from './budgeting-page.po';
import { BudgetListPage } from './budget-list-page.po';
import { Budget, BudgetRecipe } from './../../src/app/models/interfaces';
import { browser, element, by, ElementFinder, promise, protractor } from 'protractor';

export class CreateBudgetPage {

  budgetListPage = new BudgetListPage();
  budgetingPage = new BudgetingPage();

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

  createWholeBudget(budget: BudgetRecipe) {
    this.createBudget(budget.name, budget.details, String(budget.budgetAmount),
      String(budget.startDate.getMonth() + 1), String(budget.startDate.getFullYear()),
      String(budget.endDate.getMonth() + 1), String(budget.endDate.getFullYear()));

    const openButtons = this.budgetListPage.getOpenButtons(budget.name);
    openButtons.click();

    budget.categories.forEach((category) => {
      this.budgetingPage.createCategoryWithTransactions(
        category.name, category.transactions);
    });
  }
}
