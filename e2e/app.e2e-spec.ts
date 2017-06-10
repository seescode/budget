import { browser, element, by } from 'protractor';
import { CreateBudgetPage } from './pages/create-budget-page.po';
import { BudgetListPage } from './pages/budget-list-page.po';
import { BudgetingPage } from './pages/budgeting-page.po';


describe('App', function () {
  let budgetListPage: BudgetListPage;
  let createBudgetPage: CreateBudgetPage;
  let budgetingPage: BudgetingPage;

  beforeEach(() => {
    budgetListPage = new BudgetListPage();
    createBudgetPage = new CreateBudgetPage();
    budgetingPage = new BudgetingPage();
  });

  it('should be able to create a budget', () => {
    budgetListPage.navigateTo();
    const budgetListPageCreateButton = budgetListPage.getCreateBudgetButton();
    budgetListPageCreateButton.click();

    const createBudgetPageCreateButton = createBudgetPage.getCreateBudgetButton();
    createBudgetPageCreateButton.click();

    const openButtons = budgetListPage.getOpenButtons();

    expect(openButtons.count()).toBe(1);
  });

  it('should be able to create multiple categories', () => {


    const openButtons = budgetListPage.getOpenButtons();
    openButtons.click();

    budgetingPage.addNewCategory('Food');
    budgetingPage.addNewCategory('Gas');

    const categoryName = budgetingPage.getCategoryNames();

    expect(categoryName.get(0).getText()).toBe('Food');
    expect(categoryName.get(1).getText()).toBe('Gas');
  });

  it('should be able to create multiple transactions', () => {
  });

  it('should be able to delete multiple transactions', () => {
  });

  it('should be able to delete multiple categories', () => {
  });

  it('should update pie graph', () => {
  });

  it('should update category total', () => {
  });

  it('should be able to go to previous and next month and create transactions', () => {
  });

  it('should be able to refresh the app', () => {
  });

  it('should be able to create a second budget', () => {
    // Just create one similiarly named category and one transaction.
    // Verify the numbers update
  });

  it('second budget adds should not affect first budget', () => {
    // Create new transactions
    // Verify that the other budget didn't change
  });

  it('second budget deletes should not affect first budget', () => {
    // Delete transactions
    // Delete a category
    // Verify that the other budget didn't change
  });

  it('should be able to delete both budgets', () => {
  });

});
