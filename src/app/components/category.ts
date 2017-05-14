import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, ChangeDetectionStrategy } from '@angular/core';
import { Transaction, ActiveDate } from './../models/interfaces';

@Component({
  selector: 'category',
  template: `
  <div>
    <div>
        <button (click)="show()">^</button>   
        <a [routerLink]="[categoryUrl, categoryId]">[|]</a>           
        <span>{{categoryName}}</span>
        <span>{{total | currency:'USD':true:'1.2-2'}}</span> 
    </div>
    <!-- <div *ngIf="showAddTransaction"> (once they fix the ngIf plus viewchild focus bug use this div instead) -->
    <form #transactionForm="ngForm">
      Amount: <input #amountInput type="text" (keypress)="onKeyPress($event, amountInput.value, amountName.value)" name="amount" required> 
      Name: <input #amountName type="text" (keypress)="onKeyPress($event, amountInput.value, amountName.value)" name="name"> 
      <button type="button" [disabled]="!transactionForm.valid" (click)="addTransaction(amountInput.value, amountName.value)">Add</button>
    </form>
  </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class CategoryComponent {
  @Input() categoryName: string;
  @Input() categoryId: number;
  @Input() total: number;
  @Input() activeDate: ActiveDate;  
  @Input() categoryUrl: string;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() add = new EventEmitter<Transaction>();

  showAddTransaction: boolean = false;

  constructor(private renderer: Renderer) {

  }

  show() {
    this.showAddTransaction = !this.showAddTransaction;

    if (this.showAddTransaction) {
      this.renderer.invokeElementMethod(this.amountInput.nativeElement, 'focus');
    }
  }

  onKeyPress(event, amount, name) {
    if (event.key == 'Enter') {
      this.addTransaction(amount, name);
    }
  }

  showDetails() {
    //update route and pass along the categoryid in the url.
  }

  addTransaction(amount, name) {
    if (parseFloat(amount) > 0) {
      var newTransaction: Transaction = {
        name: name,
        amount: parseFloat(amount),
        timestamp: new Date(this.activeDate.year, this.activeDate.month - 1, 1, 9),
        categoryId: this.categoryId
      };

      this.renderer.invokeElementMethod(this.amountInput.nativeElement, 'focus');
      this.add.emit(newTransaction);
    }
  }
}
