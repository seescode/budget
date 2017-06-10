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
  
}
