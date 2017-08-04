// import { getCurrentMonth } from './../src/app/selectors/selectors';
// import { browser, element, by } from 'protractor';
// import { CreateBudgetPage } from './pages/create-budget-page.po';
// import { BudgetListPage } from './pages/budget-list-page.po';
// import { BudgetingPage } from './pages/budgeting-page.po';


// describe('App', function () {
//   let budgetListPage: BudgetListPage;
//   let createBudgetPage: CreateBudgetPage;
//   let budgetingPage: BudgetingPage;

//   beforeEach(() => {
//     budgetListPage = new BudgetListPage();
//     createBudgetPage = new CreateBudgetPage();
//     budgetingPage = new BudgetingPage();
//   });

//   it('should create 3 budgets', () => {
//     // create first budget with no categories
//     budgetListPage.navigateTo();
//     let budgetListPageCreateButton = budgetListPage.getCreateBudgetButton();
//     budgetListPageCreateButton.click();

//     createBudgetPage.setBudgetName('no categories');
//     createBudgetPage.setBudgetDetails('a');
//     createBudgetPage.setBudgetAmount('1');
//     createBudgetPage.setDate('1', '2017', '#budget-start');
//     createBudgetPage.setDate('2', '2017', '#budget-finish');

//     let createBudgetPageCreateButton = createBudgetPage.getCreateBudgetButton();
//     createBudgetPageCreateButton.click();

//     let open = budgetListPage.getOpenButtons();
//     expect(open.count()).toBe(1);

//     // create second budget with categories
//     budgetListPage.navigateTo();
//     budgetListPageCreateButton = budgetListPage.getCreateBudgetButton();
//     budgetListPageCreateButton.click();

//     createBudgetPage.setBudgetName('only categories');
//     createBudgetPage.setBudgetDetails('a');
//     createBudgetPage.setBudgetAmount('1');
//     createBudgetPage.setDate('1', '2017', '#budget-start');
//     createBudgetPage.setDate('2', '2017', '#budget-finish');

//     createBudgetPageCreateButton = createBudgetPage.getCreateBudgetButton();
//     createBudgetPageCreateButton.click();

//     open = budgetListPage.getOpenButtons();

//     open.get(1).click();

//     budgetingPage.addNewCategory('Food');
//     budgetingPage.addNewCategory('Gas');

//     let categoryName = budgetingPage.getCategoryNames();

//     expect(categoryName.get(0).getText()).toBe('Food');
//     expect(categoryName.get(1).getText()).toBe('Gas');

//     budgetingPage.clickManageBudgets();


//     expect(open.count()).toBe(2);

//     // create final budget with categories and transactions
//     budgetListPage.navigateTo();
//     budgetListPageCreateButton = budgetListPage.getCreateBudgetButton();
//     budgetListPageCreateButton.click();

//     createBudgetPage.setBudgetName('categories and transactions');
//     createBudgetPage.setBudgetDetails('a');
//     createBudgetPage.setBudgetAmount('1');
//     createBudgetPage.setDate('1', '2017', '#budget-start');
//     createBudgetPage.setDate('2', '2017', '#budget-finish');

//     createBudgetPageCreateButton = createBudgetPage.getCreateBudgetButton();
//     createBudgetPageCreateButton.click();

//     open = budgetListPage.getOpenButtons();

//     open.get(2).click();

//     budgetingPage.addNewCategory('Stuff');

//     categoryName = budgetingPage.getCategoryNames();

//     expect(categoryName.get(0).getText()).toBe('Stuff');

//     budgetingPage.addNewTransaction('Stuff', .01, 'Chicken');
//     budgetingPage.addNewTransaction('Stuff', .02, 'Chicken');

//     budgetingPage.clickManageBudgets();

//     expect(open.count()).toBe(3);

//   });

  

  // it('should be able to delete multiple transactions', () => {

  //   // delete first transaction
  //   let deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();

  //   deleteButtons.get(0).click();
  //   let amounts = budgetingPage.getCategoryTransactionAmounts('Food');

  //   expect(amounts.get(0).getText()).toBe('$2.00');
  //   expect(amounts.get(1).getText()).toBe('$3.00');
  //   expect(amounts.get(2).getText()).toBe('$4.00');

  //   let categoryAmounts = budgetingPage.getCategoryAmounts();
  //   expect(categoryAmounts.get(0).getText()).toBe('$9.00');


  //   // delete second transaction
  //   deleteButtons = budgetingPage.getCategoryTransactionDeleteButtons();

  //   deleteButtons.get(0).click();
  //   amounts = budgetingPage.getCategoryTransactionAmounts('Food');

  //   expect(amounts.get(0).getText()).toBe('$3.00');
  //   expect(amounts.get(1).getText()).toBe('$4.00');

  //   categoryAmounts = budgetingPage.getCategoryAmounts();
  //   expect(categoryAmounts.get(0).getText()).toBe('$7.00');

  // });


 

  // it('should be able to delete multiple categories', () => {

  //   budgetingPage.toggleTransactionsForCategory('Gas');

  //   budgetingPage.attemptDeleteCategory();
  //   budgetingPage.confirmDelete();

  //   let categoryNames = budgetingPage.getCategoryNames();
  //   expect(categoryNames.get(0).getText()).toBe('Food');

  //   budgetingPage.toggleTransactionsForCategory('Food');

  //   budgetingPage.attemptDeleteCategory();
  //   budgetingPage.confirmDelete();

  //   categoryNames = budgetingPage.getCategoryNames();
  //   expect(categoryNames.count()).toBe(0);

  // });

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


//   it('should be able to delete a budget with no categories and no transactions', () => {
//     const deletes = budgetListPage.getDeleteButtons();
//     deletes.get(0).click();

//     const open = budgetListPage.getOpenButtons();
//     expect(open.count()).toBe(2);
//   });

//   it('should be able to delete a budget with no transactions', () => {
//     const deletes = budgetListPage.getDeleteButtons();
//     deletes.get(0).click();

//     const open = budgetListPage.getOpenButtons();
//     expect(open.count()).toBe(1);
//   });

//   it('should be able to delete a budget with categories and transactions', () => {
//     const deletes = budgetListPage.getDeleteButtons();
//     deletes.get(0).click();

//     const open = budgetListPage.getOpenButtons();
//     expect(open.count()).toBe(0);
//   });
// });
