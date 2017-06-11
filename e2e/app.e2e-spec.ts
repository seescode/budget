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

  it('should update category totals when adding transactions', () => {
    budgetingPage.addNewTransaction('Food', .01, 'Chicken');
    budgetingPage.addNewTransaction('Food', .02, 'Chicken');
    budgetingPage.addNewTransaction('Food', .03, 'Beef');
    budgetingPage.addNewTransaction('Food', .04);

    budgetingPage.addNewTransaction('Gas', 10, 'NYC');
    budgetingPage.addNewTransaction('Gas', 20);
    budgetingPage.addNewTransaction('Gas', 30);
    budgetingPage.addNewTransaction('Gas', 40);

    const categoryAmounts = budgetingPage.getCategoryAmounts();

    expect(categoryAmounts.get(0).getText()).toBe('$0.10');
    expect(categoryAmounts.get(1).getText()).toBe('$100.00');
  });

  it('should be able to view transactions in category view', () => {

    budgetingPage.toggleTransactionsForCategory('Food');
    let amounts = budgetingPage.getCategoryTransactionAmounts('Food');

    expect(amounts.get(0).getText()).toBe('$0.01');
    expect(amounts.get(1).getText()).toBe('$0.02');
    expect(amounts.get(2).getText()).toBe('$0.03');
    expect(amounts.get(3).getText()).toBe('$0.04');

    amounts = budgetingPage.getCategoryTransactionAmounts('Gas');
    expect(amounts.count()).toBe(0);

    let names = budgetingPage.getCategoryTransactionNames('Food');

    expect(names.get(0).getText()).toBe('Chicken');
    expect(names.get(1).getText()).toBe('Chicken');
    expect(names.get(2).getText()).toBe('Beef');
    expect(names.get(3).getText()).toBe('');

    names = budgetingPage.getCategoryTransactionNames('Gas');
    expect(names.count()).toBe(0);
  });

  it('should be able to view another set of transactions', () => {
    budgetingPage.toggleTransactionsForCategory('Gas');
    let amounts = budgetingPage.getCategoryTransactionAmounts('Gas');

    expect(amounts.get(0).getText()).toBe('$10.00');
    expect(amounts.get(1).getText()).toBe('$20.00');
    expect(amounts.get(2).getText()).toBe('$30.00');
    expect(amounts.get(3).getText()).toBe('$40.00');

    amounts = budgetingPage.getCategoryTransactionAmounts('Food');
    expect(amounts.count()).toBe(0);

    let names = budgetingPage.getCategoryTransactionNames('Gas');

    expect(names.get(0).getText()).toBe('NYC');
    expect(names.get(1).getText()).toBe('');
    expect(names.get(2).getText()).toBe('');
    expect(names.get(3).getText()).toBe('');

    names = budgetingPage.getCategoryTransactionNames('Food');
    expect(names.count()).toBe(0);

  });

  it('should be able to delete multiple transactions', () => {
  });

  it('should be able to delete multiple categories', () => {
  });

  it('should update pie graph', () => {
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
