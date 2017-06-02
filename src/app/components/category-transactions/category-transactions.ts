import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, ChangeDetectionStrategy } from '@angular/core';
import { Transaction } from './../../models/interfaces';

@Component({
  selector: 'yb-category-transactions',
  templateUrl: './category-transactions.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTransactionsComponent {
  @Input() transactions: Array<Transaction>;
  @Output() remove = new EventEmitter<string>();

  constructor() {

  }

}
