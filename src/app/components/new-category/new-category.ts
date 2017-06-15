import { Category } from './../../models/interfaces';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-new-category',
  templateUrl: './new-category.html',
  styleUrls: ['./new-category.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCategoryComponent {
  @Output() add = new EventEmitter<any>();
  name = '';

  addCategory() {

    if (this.name.trim() === '') {
      return;
    }

    const newCategory: Category = {
      name: this.name.trim()
    };

    this.add.emit(newCategory);
    this.name = '';
  }

  onKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.addCategory();
    }
  }
}
