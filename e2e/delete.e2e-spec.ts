import { browser, element, by } from 'protractor';
import { CreateBudgetPage } from './pages/create-budget-page.po';
import { BudgetListPage } from './pages/budget-list-page.po';
import { BudgetingPage } from './pages/budgeting-page.po';
import { BudgetRecipe } from './../src/app/models/interfaces';

describe('App', function () {
  let budgetListPage: BudgetListPage;
  let createBudgetPage: CreateBudgetPage;
  let budgetingPage: BudgetingPage;

  beforeEach(() => {
    budgetListPage = new BudgetListPage();
    createBudgetPage = new CreateBudgetPage();
    budgetingPage = new BudgetingPage();
  });

  it('should create 3 budgets', () => {
    // create first budget with no categories
    //browser.restartSync();
    //browser.manage().window().maximize();
    // browser.manage().window().setSize(1600, 1000);


    budgetListPage.navigateTo();
    let budgetListPageCreateButton = budgetListPage.getCreateBudgetButton();
    budgetListPageCreateButton.click();

    let budgetRecipe: BudgetRecipe = {
      name: 'no-categories',
      details: 'a',
      budgetAmount: 1,
      startDate: new Date(2017, 0),
      endDate: new Date(2017, 1),
      categories: []
    };

    createBudgetPage.createWholeBudget(budgetRecipe);




    // create second budget with categories

    budgetListPage.navigateTo();
    budgetListPageCreateButton = budgetListPage.getCreateBudgetButton();
    budgetListPageCreateButton.click();

    budgetRecipe = {
      name: 'only-categories',
      details: 'a',
      budgetAmount: 1,
      startDate: new Date(2017, 0),
      endDate: new Date(2017, 1),
      categories: [{
        name: 'Food',
        transactions: []
      },
      {
        name: 'Gas',
        transactions: []
      }
      ]
    };

    createBudgetPage.createWholeBudget(budgetRecipe);

    // create final budget with categories and transactions

    budgetListPage.navigateTo();
    budgetListPageCreateButton = budgetListPage.getCreateBudgetButton();
    budgetListPageCreateButton.click();

    budgetRecipe = {
      name: 'categories-and-transactions',
      details: 'a',
      budgetAmount: 1,
      startDate: new Date(2017, 0),
      endDate: new Date(2017, 1),
      categories: [{
        name: 'Stuff',
        transactions: [
          { amount: .01, name: 'Chicken' },
          { amount: .02, name: 'Chicken' },
          { amount: .03, name: 'Chicken' }
        ]
      },
      {
        name: 'Gas',
        transactions: []
      }
      ]
    };

    createBudgetPage.createWholeBudget(budgetRecipe);

  });



  it('should be able to delete multiple transactions', () => {

    // delete first transaction
    let deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();

    deleteButtons.get(0).click();
    let amounts = budgetingPage.getCategoryTransactionAmounts('Stuff');

    expect(amounts.get(0).getText()).toBe('$0.02');
    expect(amounts.get(1).getText()).toBe('$0.03');

    let categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$0.05');
    expect(categoryAmounts.get(1).getText()).toBe('$0.00');

    // delete second transaction
    deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();

    deleteButtons.get(0).click();
    amounts = budgetingPage.getCategoryTransactionAmounts('Stuff');

    expect(amounts.get(0).getText()).toBe('$0.03');

    categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$0.03');
    expect(categoryAmounts.get(1).getText()).toBe('$0.00');

    // delete final transaction
    deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();

    deleteButtons.get(0).click();

    categoryAmounts = budgetingPage.getCategoryAmounts();
    expect(categoryAmounts.get(0).getText()).toBe('$0.00');
    expect(categoryAmounts.get(1).getText()).toBe('$0.00');

  });

  it('should be able to delete multiple categories', () => {

    budgetingPage.toggleTransactionsForCategory('Stuff');

    budgetingPage.attemptDeleteCategory();
    budgetingPage.confirmDelete();

    let categoryNames = budgetingPage.getCategoryNames();
    expect(categoryNames.get(0).getText()).toBe('Gas');

    budgetingPage.toggleTransactionsForCategory('Gas');

    budgetingPage.attemptDeleteCategory();
    budgetingPage.confirmDelete();

    categoryNames = budgetingPage.getCategoryNames();
    expect(categoryNames.count()).toBe(0);

  });

  // it('should be able to delete a budget with no categories and no transactions', () => {
  //   budgetingPage.clickManageBudgets();

  //   let open = budgetListPage.getOpenButtons();
  //   expect(open.count()).toBe(3);

  //   const deletes = budgetListPage.getDeleteButtons();
  //   deletes.get(0).click();

  //   open = budgetListPage.getOpenButtons();
  //   expect(open.count()).toBe(2);
  // });

  // it('should be able to delete a budget with no transactions', () => {
  //   budgetingPage.clickManageBudgets();

  //   const deletes = budgetListPage.getDeleteButtons();
  //   deletes.get(0).click();

  //   const open = budgetListPage.getOpenButtons();
  //   expect(open.count()).toBe(1);
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


  // it('should be able to delete a budget with no categories and no transactions', () => {
  //   const deletes = budgetListPage.getDeleteButtons();
  //   deletes.get(0).click();

  //   const open = budgetListPage.getOpenButtons();
  //   expect(open.count()).toBe(2);
  // });

  // it('should be able to delete a budget with no transactions', () => {
  //   const deletes = budgetListPage.getDeleteButtons();
  //   deletes.get(0).click();

  //   const open = budgetListPage.getOpenButtons();
  //   expect(open.count()).toBe(1);
  // });

  // it('should be able to delete a budget with categories and transactions', () => {
  //   const deletes = budgetListPage.getDeleteButtons();
  //   deletes.get(0).click();

  //   const open = budgetListPage.getOpenButtons();
  //   expect(open.count()).toBe(0);
  // });
});
