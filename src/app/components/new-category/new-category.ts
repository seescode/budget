import { Category } from './../../models/interfaces';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-new-category',
  templateUrl: './new-category.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCategoryComponent {
  @Output() add = new EventEmitter<any>();

  addCategory(newCategoryName: string) {

    if (newCategoryName.trim() === '') {
      return;
    }

    const newCategory: Category = {
      name: newCategoryName.trim()
    };

    this.add.emit(newCategory);
  }
}
