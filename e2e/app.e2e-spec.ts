import { getCurrentMonth } from './../src/app/selectors/selectors';
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

    createBudgetPage.setBudgetName('budget 2');
    createBudgetPage.setBudgetDetails('some random stuff');
    createBudgetPage.setBudgetAmount('12000');
    createBudgetPage.setDate('1', '2017', '#budget-start');
    createBudgetPage.setDate('12', '2017', '#budget-finish');

    const createBudgetPageCreateButton = createBudgetPage.getCreateBudgetButton();
    createBudgetPageCreateButton.click();

    const openButtons = budgetListPage.getOpenButtons();

    expect(openButtons.count()).toBe(1);
  });

  it('should be able to load budget', () => {
    const openButtons = budgetListPage.getOpenButtons();
    openButtons.click();

    const currentMonth = getCurrentMonth();

    const month = currentMonth.format('MMMM');
    const year = currentMonth.format('YYYY');

    // verify today's year and month
    const title = budgetingPage.getBudgetH1Title();
    expect(title.getText()).toBe(month + ' ' + year + ' budget 2');

  });

  it('should be able to create multiple categories', () => {
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

  it('should be able to refresh the app', () => {
    browser.refresh();
    const currentMonth = getCurrentMonth();

    const month = currentMonth.format('MMMM');
    const year = currentMonth.format('YYYY');

    // verify today's year and month
    const title = budgetingPage.getBudgetH1Title();
    expect(title.getText()).toBe(month + ' ' + year + ' budget 2');

    const categoryAmounts = budgetingPage.getCategoryAmounts();

    expect(categoryAmounts.get(0).getText()).toBe('$0.10');
    expect(categoryAmounts.get(1).getText()).toBe('$100.00');
  });
  

  it('should be able to go to previous month', () => {

    budgetingPage.clickPreviousMonth();

    const previousMonth = getCurrentMonth().add(-1, 'month');;
    const month = previousMonth.format('MMMM');
    const year = previousMonth.format('YYYY');

    // Verify title
    const title = budgetingPage.getBudgetH1Title();
    expect(title.getText()).toBe(month + ' ' + year + ' budget 2');


    // Verify that category totals are 0
    const categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$0.00');
    expect(categoryAmounts.get(1).getText()).toBe('$0.00');

    // Verify that when you click on category total there are no transactions
    budgetingPage.toggleTransactionsForCategory('Food');
    let amounts = budgetingPage.getCategoryTransactionAmounts('Food');
    expect(amounts.count()).toBe(0);

    budgetingPage.toggleTransactionsForCategory('Gas');
    amounts = budgetingPage.getCategoryTransactionAmounts('Gas');
    expect(amounts.count()).toBe(0);

  });

  it('should be able to go to next month', () => {
    budgetingPage.clickNextMonth();
    budgetingPage.clickNextMonth();

    const nextMonth = getCurrentMonth().add(1, 'month');;
    const month = nextMonth.format('MMMM');
    const year = nextMonth.format('YYYY');

    // Verify title
    const title = budgetingPage.getBudgetH1Title();
    expect(title.getText()).toBe(month + ' ' + year + ' budget 2');


    // Verify that category totals are 0
    const categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$0.00');
    expect(categoryAmounts.get(1).getText()).toBe('$0.00');

    // Verify that when you click on category total there are no transactions
    budgetingPage.toggleTransactionsForCategory('Food');
    let amounts = budgetingPage.getCategoryTransactionAmounts('Food');
    expect(amounts.count()).toBe(0);

    budgetingPage.toggleTransactionsForCategory('Gas');
    amounts = budgetingPage.getCategoryTransactionAmounts('Gas');
    expect(amounts.count()).toBe(0);
  });

  it('should be able to create and undo transaction', () => {
    budgetingPage.addNewTransaction('Food', 1);
    budgetingPage.addNewTransaction('Food', 2);
    budgetingPage.addNewTransaction('Food', 3);
    budgetingPage.addNewTransaction('Food', 4);

    let categoryAmounts = budgetingPage.getCategoryAmounts();

    expect(categoryAmounts.get(0).getText()).toBe('$10.00');
    expect(categoryAmounts.get(1).getText()).toBe('$0.00');

    budgetingPage.addNewTransaction('Food', 5);
    categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$15.00');
    expect(categoryAmounts.get(1).getText()).toBe('$0.00');

    // Click undo and verify that we don't see the removed transaction
    budgetingPage.undoCreateTransaction();
    categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$10.00');
    expect(categoryAmounts.get(1).getText()).toBe('$0.00');

    // Verify that you only see 4 transactions after toggling
    budgetingPage.toggleTransactionsForCategory('Food');
    const amounts = budgetingPage.getCategoryTransactionAmounts('Food');

    expect(amounts.get(0).getText()).toBe('$1.00');
    expect(amounts.get(1).getText()).toBe('$2.00');
    expect(amounts.get(2).getText()).toBe('$3.00');
    expect(amounts.get(3).getText()).toBe('$4.00');
  });

  it('should be able to delete multiple transactions', () => {

    // delete first transaction
    let deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();

    deleteButtons.get(0).click();
    let amounts = budgetingPage.getCategoryTransactionAmounts('Food');

    expect(amounts.get(0).getText()).toBe('$2.00');
    expect(amounts.get(1).getText()).toBe('$3.00');
    expect(amounts.get(2).getText()).toBe('$4.00');

    let categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$9.00');


    // delete second transaction
    deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();

    deleteButtons.get(0).click();
    amounts = budgetingPage.getCategoryTransactionAmounts('Food');

    expect(amounts.get(0).getText()).toBe('$3.00');
    expect(amounts.get(1).getText()).toBe('$4.00');

    categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$7.00');

  });


  it('should be able to undo transaction delete', () => {

    // delete second transaction
    const deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();

    deleteButtons.get(0).click();
    let amounts = budgetingPage.getCategoryTransactionAmounts('Food');

    expect(amounts.get(0).getText()).toBe('$4.00');

    let categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$4.00');

    // undo delete
    budgetingPage.undoDeleteTransaction();

    amounts = budgetingPage.getCategoryTransactionAmounts('Food');

    expect(amounts.get(0).getText()).toBe('$4.00');
    expect(amounts.get(1).getText()).toBe('$3.00');

    categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$7.00');

  });

  it('should attempt to delete category', () => {
    let categoryNames = budgetingPage.getCategoryNames();
    expect(categoryNames.count()).toBe(2);

    // delete remaining transactions
    let deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();
    deleteButtons.get(0).click();
    deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();
    deleteButtons.get(0).click();

    budgetingPage.attemptDeleteCategory();

    categoryNames = budgetingPage.getCategoryNames();
    expect(categoryNames.count()).toBe(2);
  });

  it('should be able to delete multiple categories', () => {

    budgetingPage.toggleTransactionsForCategory('Gas');

    budgetingPage.attemptDeleteCategory();
    budgetingPage.confirmDelete();

    let categoryNames = budgetingPage.getCategoryNames();
    expect(categoryNames.get(0).getText()).toBe('Food');

    budgetingPage.toggleTransactionsForCategory('Food');

    budgetingPage.attemptDeleteCategory();
    budgetingPage.confirmDelete();

    categoryNames = budgetingPage.getCategoryNames();
    expect(categoryNames.count()).toBe(0);

  });

  it('should be able to delete a budget with no categories', () => {
  });

  it('should be able to delete a budget with no transactions', () => {
  });

  it('should be able to delete a budget with categories and transactions', () => {
  });

  it('should update pie graph', () => {
  });

  it('should work with a one month budget', () => {
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
