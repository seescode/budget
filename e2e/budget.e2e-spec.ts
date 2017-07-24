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

  // ///////////////////////////

  // it('should be able to delete a budget with no categories and no transactions', () => {
  //   budgetingPage.clickManageBudgets();

  //   const budgetListPageCreateButton = budgetListPage.getCreateBudgetButton();
  //   budgetListPageCreateButton.click();

  //   createBudgetPage.createBudget('no categories', '', '1', '1', '2017', '2', '2017');


  //   let open = budgetListPage.getOpenButtons();
  //   expect(open.count()).toBe(2);


  //   const deletes = budgetListPage.getDeleteButtons();
  //   deletes.get(1).click();

  //   open = budgetListPage.getOpenButtons();
  //   expect(open.count()).toBe(1);

  // });

  // it('should be able to delete a budget with no transactions', () => {
  // });

  // it('should be able to delete a budget with categories and transactions', () => {
  // });


  // it('should work with a one month budget', () => {
  // });


  // it('should be able to create a second budget', () => {
  //   // Just create one similiarly named category and one transaction.
  //   // Verify the numbers update
  // });

  // it('second budget adds should not affect first budget', () => {
  //   // Create new transactions
  //   // Verify that the other budget didn't change
  // });

  // it('second budget deletes should not affect first budget', () => {
  //   // Delete transactions
  //   // Delete a category
  //   // Verify that the other budget didn't change
  // });

  // it('should be able to delete both budgets', () => {
  // });

});
