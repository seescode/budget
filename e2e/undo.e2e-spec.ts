import { BudgetRecipe } from './../src/app/models/interfaces';
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

  it('should be able to create a budget 2', () => {

    browser.restartSync();
    browser.manage().window().maximize();
    // browser.manage().window().setSize(1600, 1000);

    budgetListPage.navigateTo();
    const budgetListPageCreateButton = budgetListPage.getCreateBudgetButton();
    budgetListPageCreateButton.click();

    const budgetRecipe: BudgetRecipe = {
      name: 'japan',
      details: '',
      budgetAmount: 12000,
      startDate: new Date(2017, 0),
      endDate: new Date(2017, 11),
      categories: [{
        name: 'Food',
        transactions: [
          { amount: 30, name: 'Chicken' },
          { amount: 20, name: 'Ham' },
          { amount: 10, name: 'Lettuce' },
        ]
      },
      {
        name: 'Stuff',
        transactions: [
          { amount: 50 }
        ]
      }]
    };

    createBudgetPage.createWholeBudget(budgetRecipe);

    // const openButtons = budgetListPage.getOpenButtons();
    // openButtons.click();
  });


  it('should be able to create and undo transaction', () => {

    // Click undo and verify that we don't see the removed transaction
    budgetingPage.addNewTransaction('Food', 1);
    let categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$61.00');

    budgetingPage.undoCreateTransaction();
    categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$60.00');
  });

  it('should be able to undo transaction delete', () => {

    // delete second transaction
    budgetingPage.toggleTransactionsForCategory('Food');
    const deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();

    deleteButtons.get(0).click();
    // let amounts = budgetingPage.getCategoryTransactionAmounts('Food');

    // expect(amounts.get(0).getText()).toBe('$20.00');
    // expect(amounts.get(1).getText()).toBe('$10.00');

    let categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$30.00');

    // undo delete
    budgetingPage.undoDeleteTransaction();

    let amounts = budgetingPage.getCategoryTransactionAmounts('Food');

    expect(amounts.get(0).getText()).toBe('$30.00');
    expect(amounts.get(1).getText()).toBe('$20.00');
    expect(amounts.get(2).getText()).toBe('$10.00');

    categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$60.00');
  });

  it('should attempt to delete category', () => {
    // delete remaining transactions
    budgetingPage.toggleTransactionsForCategory('Stuff');
    const deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();
    deleteButtons.get(0).click();

    budgetingPage.attemptDeleteCategory();

    let categoryNames = budgetingPage.getCategoryNames();
    categoryNames = budgetingPage.getCategoryNames();
    expect(categoryNames.count()).toBe(2);
  });
});
