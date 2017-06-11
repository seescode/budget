import { Action } from '@ngrx/store';
import { MdSnackBar } from '@angular/material';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy, Renderer } from '@angular/core';
import { Transaction, ActiveDate } from './../../models/interfaces';

@Component({
  selector: 'yb-category',
  templateUrl: './category.html',
  styleUrls: ['./category.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent {
  @Input() categoryName: string;
  @Input() categoryId: string;
  @Input() transactions: Transaction[];
  @Input() total: number;
  @Input() selected: boolean;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() add = new EventEmitter<Transaction>();
  @Output() edit = new EventEmitter<string>();
  @Output() removeTransaction = new EventEmitter<Transaction>();
  @Output() removeCategory = new EventEmitter<string>();


  showAddTransaction = false;

  constructor(private renderer: Renderer, private snackBar: MdSnackBar) {

  }

  onKeyPress(event: any, amount: string, name: string) {
    if (event.key === 'Enter') {
      this.addTransaction(amount, name);
    }
  }

  addTransaction(amount: string, name: string) {
    if (parseFloat(amount) > 0) {
      const newTransaction: Transaction = {
        name: name,
        amount: parseFloat(amount),
        categoryId: this.categoryId
      };

      this.renderer.invokeElementMethod(this.amountInput.nativeElement, 'focus');
      this.add.emit(newTransaction);
    }
  }

  openConfirmation() {
    const instance = this.snackBar.open('Are you sure you want to delete?', 'Yes', {
      // TODO: this should be 5000 but to make e2e tests run faster I set to 500
      // There must be a way to have this be configurable to be shorter during a
      // e2e test.
      duration: 5000,
    });

    const onActionSubscription = instance.onAction().subscribe(() => {
      this.removeCategory.emit(this.categoryId);
    });

    const onAfterDismissedSubscription = instance.afterDismissed().subscribe(() => {
      // Cleanup subscriptions
      onActionSubscription.unsubscribe();
      onAfterDismissedSubscription.unsubscribe();
    });
  }


}
