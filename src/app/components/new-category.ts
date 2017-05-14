import { Category } from './../models/interfaces';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'new-category',
  template: `
  <div>
      New Category Name: <input type="text" [(ngModel)]="name"> 
      <button (click)="addCategory()">Add</button>
  </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class NewCategoryComponent {
  @Output() add = new EventEmitter<Category>();
  name: string = '';

  addCategory() {
    var newCategory:Category = {
      name: this.name,
      id: Math.floor((Math.random() * 10000000) + 1)
    };

    this.add.emit(newCategory);
  }
}
