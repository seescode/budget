import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, ChangeDetectionStrategy } from '@angular/core';
import { Transaction } from './../models/interfaces';

@Component({
  selector: 'category-transactions',
  template: `
  <div *ngFor="let trans of transactions">
    <span>{{trans.timestamp}}</span> 
    <span>{{trans.name}}</span> 
    <span>{{trans.amount}}</span>     
    <button (click)="delete(trans._id)">X</button>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CategoryTransactionsComponent {
  @Input() transactions: Array<Transaction>;
  @Output() remove = new EventEmitter<number>();

  constructor() {

  }

  delete(transactionId) {
    this.remove.emit(transactionId);
  }

}
