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
