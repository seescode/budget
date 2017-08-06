import { browser, element, by, ElementFinder, promise, ElementArrayFinder } from 'protractor';

export class BudgetingPage {

  addNewCategory(categoryName: string) {
    const newCategoryName = element(by.css('.new-category-name'));
    newCategoryName.sendKeys(categoryName);

    const categoryButton = element(by.css('.add-new-category'));
    categoryButton.click();
  }

  getCategoryNames() {
    return element.all(by.css('.category-name'));
  }

  getCategoryAmounts() {
    return element.all(by.css('.category-amount'));
  }

  getCategoryTransactionAmounts(categoryName: string) {
    return element.all(by.css('.existing-transaction-amount-for-' + categoryName));
  }

  getCategoryTransactionNames(categoryName: string) {
    return element.all(by.css('.existing-transaction-name-for-' + categoryName));
  }

  getCategoryTransactionDeleteButtons() {
    return element.all(by.css('.delete-transaction-button'));
  }

  getBudgetH1Title() {
    return element(by.css('h1'));
  }

  getBarGraphData() {

    return {
      monthlySpent: element(by.id('Monthly-Spent')),
      monthlyRemaining: element(by.id('Monthly-Remaining')),
      monthlySurplus: element(by.id('Monthly-Surplus')),
      yearlySpent: element(by.id('Yearly-Spent')),
      yearlyRemaining: element(by.id('Yearly-Remaining'))
    }
  }

  addNewTransaction(categoryName: string, transactionAmount: number, transactionName?: string) {

    const amountTextbox = element(by.css('.transaction-amount-for-' + categoryName));
    amountTextbox.sendKeys(transactionAmount);

    if (transactionName != null && transactionName.trim() !== '') {
      const nameTextbox = element(by.css('.transaction-name-for-' + categoryName));
      nameTextbox.sendKeys(transactionName);
    }

    const submit = element(by.css('.submit-transaction-for-' + categoryName));
    submit.click();
  }

  toggleTransactionsForCategory(categoryName: string) {
    const submit = element(by.css('.view-transactions-button-for-' + categoryName));
    submit.click();
  }

  attemptDeleteCategory() {
    // browser.sleep(300);
    const submit = element(by.css('.delete-category-button'));
    submit.click();
  }

  clickPreviousMonth() {
    const submit = element(by.css('.previous-month-button'));
    submit.click();
  }

  clickNextMonth() {
    const submit = element(by.css('.next-month-button'));
    submit.click();
  }

  clickManageBudgets() {
    const submit = element(by.css('#manage-budgets'));
    submit.click();
  }

  private clickSnackBar() {
    // Could not get this to click it so I had to resort to javascript clicking.
    // https://stackoverflow.com/questions/37809915/element-not-visible-error-not-able-to-click-an-element
    const submit = element(by.css('.mat-simple-snackbar-action'));
    browser.executeScript("arguments[0].click();", submit.getWebElement());
  }

  undoCreateTransaction() {
    this.clickSnackBar();
  }

  undoDeleteTransaction() {
    this.clickSnackBar();
  }

  confirmDelete() {
    this.clickSnackBar();
  }

  createCategoryWithTransactions(categoryName: string, transactions: any[]) {
    this.addNewCategory(categoryName);

    transactions.forEach(t => {
      this.addNewTransaction(categoryName, t.amount, t.name);
    });
  }
}
