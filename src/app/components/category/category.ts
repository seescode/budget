import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy, Renderer } from '@angular/core';
import { Transaction, ActiveDate } from './../../models/interfaces';

@Component({
  selector: 'yb-category',
  templateUrl: './category.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent {
  @Input() categoryName: string;
  @Input() categoryId: number;
  @Input() total: number;
  @Input() categoryUrl: string;
  @Input() budgetId: number;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() add = new EventEmitter<Transaction>();

  showAddTransaction: boolean = false;

  constructor(private renderer: Renderer) {

  }


  onKeyPress(event: any, amount: string, name: string) {
    if (event.key == 'Enter') {
      this.addTransaction(amount, name);
    }
  }

  addTransaction(amount: string, name: string) {
    if (parseFloat(amount) > 0) {
      var newTransaction: Transaction = {
        name: name,
        amount: parseFloat(amount),
        categoryId: this.categoryId,
        budgetId: this.budgetId
      };

      this.renderer.invokeElementMethod(this.amountInput.nativeElement, 'focus');
      this.add.emit(newTransaction);
    }
  }
}
