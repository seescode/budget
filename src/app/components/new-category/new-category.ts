import { Category } from './../../models/interfaces';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-new-category',
  templateUrl: './new-category.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCategoryComponent {
  @Output() add = new EventEmitter<any>();
  @Input() budgetId: number;

  addCategory(newCategoryName: string) {
    var newCategory:Category  = {
      name: newCategoryName,
      budgetId: this.budgetId
    };

    this.add.emit(newCategory);
  }
}
