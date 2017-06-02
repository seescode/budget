import { Transaction } from './../../models/interfaces';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-edit-category-page',
  templateUrl: './edit-category-page.component.html',
  styleUrls: ['./edit-category-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryPageComponent implements OnInit {

  // TODO: must hook this up to the store
  transactions: Transaction[];

  constructor() { }

  ngOnInit() {
  }

  removeTransaction(transactionId: string) {
    // todo must dispatch to remove transaction
  }

}
