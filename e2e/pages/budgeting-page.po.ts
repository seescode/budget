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

  getBudgetH1Title() {
    return element(by.css('h1'));
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

  clickPreviousMonth() {
    const submit = element(by.css('.previous-month-button'));
    submit.click();
  }

  clickNextMonth() {
    const submit = element(by.css('.next-month-button'));
    submit.click();
  }

  private clickSnackBar() {
    const submit = element(by.css('.mat-simple-snackbar-action'));
    submit.click();
  }

  undoTransaction() {
    this.clickSnackBar();
  }

  confirmDelete() {
    this.clickSnackBar();
  }


}
