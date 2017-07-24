import { BudgetRecipe } from './../src/app/models/interfaces';
import { getCurrentMonth } from './../src/app/selectors/selectors';
import { browser, element, by } from 'protractor';
import { CreateBudgetPage } from './pages/create-budget-page.po';
import { BudgetListPage } from './pages/budget-list-page.po';
import { BudgetingPage } from './pages/budgeting-page.po';


fdescribe('App', function () {
  let budgetListPage: BudgetListPage;
  let createBudgetPage: CreateBudgetPage;
  let budgetingPage: BudgetingPage;

  beforeEach(() => {
    budgetListPage = new BudgetListPage();
    createBudgetPage = new CreateBudgetPage();
    budgetingPage = new BudgetingPage();
  });

  it('should be able to create a budget', () => {

    // browser.restartSync();

    budgetListPage.navigateTo();
    const budgetListPageCreateButton = budgetListPage.getCreateBudgetButton();
    budgetListPageCreateButton.click();

    const budgetRecipe: BudgetRecipe = {
      name: 'budget 2',
      details: 'some random stuff',
      budgetAmount: 12000,
      startDate: new Date(2017, 0),
      endDate: new Date(2017, 11),
      categories: [{
        name: 'Food',
        transactions: [
          { amount: .01, name: 'Chicken' },
          { amount: .02, name: 'Chicken' },
          { amount: .03, name: 'Beef' },
          { amount: .04, name: null }
        ]
      },
      {
        name: 'Gas',
        transactions: [
          { amount: 10, name: 'NYC' },
          { amount: 20, name: null },
          { amount: 30, name: null },
          { amount: 40, name: null }
        ]
      }
      ]
    };

    createBudgetPage.createWholeBudget(budgetRecipe);

    budgetListPage.navigateTo();
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


  it('should update category totals when adding transactions', () => {
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

  // it('should be able to go to previous month', () => {

  //   budgetingPage.clickPreviousMonth();

  //   const previousMonth = getCurrentMonth().add(-1, 'month');;
  //   const month = previousMonth.format('MMMM');
  //   const year = previousMonth.format('YYYY');

  //   // Verify title
  //   const title = budgetingPage.getBudgetH1Title();
  //   expect(title.getText()).toBe(month + ' ' + year + ' budget 2');


  //   // Verify that category totals are 0
  //   const categoryAmounts = budgetingPage.getCategoryAmounts();
  //   expect(categoryAmounts.get(0).getText()).toBe('$0.00');
  //   expect(categoryAmounts.get(1).getText()).toBe('$0.00');

  //   // Verify that when you click on category total there are no transactions
  //   budgetingPage.toggleTransactionsForCategory('Food');
  //   let amounts = budgetingPage.getCategoryTransactionAmounts('Food');
  //   expect(amounts.count()).toBe(0);

  //   budgetingPage.toggleTransactionsForCategory('Gas');
  //   amounts = budgetingPage.getCategoryTransactionAmounts('Gas');
  //   expect(amounts.count()).toBe(0);

  // });

  // it('should be able to go to next month', () => {
  //   budgetingPage.clickNextMonth();
  //   budgetingPage.clickNextMonth();

  //   const nextMonth = getCurrentMonth().add(1, 'month');;
  //   const month = nextMonth.format('MMMM');
  //   const year = nextMonth.format('YYYY');

  //   // Verify title
  //   const title = budgetingPage.getBudgetH1Title();
  //   expect(title.getText()).toBe(month + ' ' + year + ' budget 2');


  //   // Verify that category totals are 0
  //   const categoryAmounts = budgetingPage.getCategoryAmounts();
  //   expect(categoryAmounts.get(0).getText()).toBe('$0.00');
  //   expect(categoryAmounts.get(1).getText()).toBe('$0.00');

  //   // Verify that when you click on category total there are no transactions
  //   budgetingPage.toggleTransactionsForCategory('Food');
  //   let amounts = budgetingPage.getCategoryTransactionAmounts('Food');
  //   expect(amounts.count()).toBe(0);

  //   budgetingPage.toggleTransactionsForCategory('Gas');
  //   amounts = budgetingPage.getCategoryTransactionAmounts('Gas');
  //   expect(amounts.count()).toBe(0);
  // });


  it('should update pie graph', () => {
  });

});
