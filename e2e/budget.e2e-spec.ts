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
          { amount: 1, name: 'Chicken' }
        ]
      },
      ]
    };

    createBudgetPage.createWholeBudget(budgetRecipe);

    const openButtons = budgetListPage.getOpenButtons();
    openButtons.click();
  });


  it('should be able to go to previous month', () => {
    budgetingPage.clickPreviousMonth();

    const previousMonth = getCurrentMonth().add(-1, 'month');;
    const month = previousMonth.format('MMMM');
    const year = previousMonth.format('YYYY');

    // Verify title
    const title = budgetingPage.getBudgetH1Title();
    expect(title.getText()).toBe(month + ' ' + year + ' japan');

    // Verify that category totals are 0
    let categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$0.00');

    // Verify that when you click on category total there are no transactions
    budgetingPage.toggleTransactionsForCategory('Food');
    let amounts = budgetingPage.getCategoryTransactionAmounts('Food');
    expect(amounts.count()).toBe(0);

    budgetingPage.toggleTransactionsForCategory('Food');

    budgetingPage.addNewTransaction('Food', 100);
    budgetingPage.addNewTransaction('Food', 200);

    categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$300.00');
  });

  it('should be able to go to next month', () => {
    budgetingPage.clickNextMonth();
    budgetingPage.clickNextMonth();

    const nextMonth = getCurrentMonth().add(1, 'month');;
    const month = nextMonth.format('MMMM');
    const year = nextMonth.format('YYYY');

    // Verify title
    const title = budgetingPage.getBudgetH1Title();
    expect(title.getText()).toBe(month + ' ' + year + ' japan');


    // Verify that category totals are 0
    let categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$0.00');

    // Verify that when you click on category total there are no transactions
    budgetingPage.toggleTransactionsForCategory('Food');
    let amounts = budgetingPage.getCategoryTransactionAmounts('Food');
    expect(amounts.count()).toBe(0);

    budgetingPage.toggleTransactionsForCategory('Food');

    budgetingPage.addNewTransaction('Food', 10);
    budgetingPage.addNewTransaction('Food', 20);

    categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$30.00');
  });

  it('should be able to create and undo transaction', () => {

    // Click undo and verify that we don't see the removed transaction
    budgetingPage.addNewTransaction('Food', 1);
    // let categoryAmounts = budgetingPage.getCategoryAmounts();
    // expect(categoryAmounts.get(0).getText()).toBe('$31.00');

    budgetingPage.undoCreateTransaction();
    // categoryAmounts = budgetingPage.getCategoryAmounts();
    // expect(categoryAmounts.get(0).getText()).toBe('$30.00');

    // // Verify that you only see 4 transactions after toggling
    // budgetingPage.toggleTransactionsForCategory('Food');
    // const amounts = budgetingPage.getCategoryTransactionAmounts('Food');

    // expect(amounts.get(0).getText()).toBe('$10.00');
  });
});
