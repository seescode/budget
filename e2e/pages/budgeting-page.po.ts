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
}
