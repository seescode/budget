import { Action } from '@ngrx/store';
import { MatSnackBar  } from '@angular/material';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy, Renderer } from '@angular/core';
import { Transaction, ActiveDate } from './../../models/interfaces';
import { environment } from './../../../environments/environment';

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

  constructor(private renderer: Renderer, private snackBar: MatSnackBar ) {

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
        categoryName: this.categoryId
      };

      this.renderer.invokeElementMethod(this.amountInput.nativeElement, 'focus');
      this.add.emit(newTransaction);
    }
  }

  openConfirmation() {
    const instance = this.snackBar.open('Are you sure you want to delete?', 'Yes', {
      duration: environment.snackBarDuration,
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
