import { ActiveDate, Budget, Transaction, Category } from './../../models/interfaces';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Database } from '@ngrx/db';

@Component({
  selector: 'yb-budgeting-page',
  templateUrl: './budgeting-page.component.html',
  styleUrls: ['./budgeting-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetingPageComponent implements OnInit {

categoryData$ = [
    {
      categoryName: 'first',
      categoryId: '1',
      total: 50,
      categoryUrl: 'google.com',
      //add: this.nextMonth //TODO fix me
    },
    {
      categoryName: 'second',
      categoryId: '2',
      total: 300,
      categoryUrl: 'google.com',
      //add: this.nextMonth
    }    
  ];

  budgetAmount$: number = 40000;
  //categories$: Observable<any>;
  remainingYearlyBudget$: number = 10000;
  remainingMonthlyBudget$: number = 2000;
  selectedMonthAndYear$: ActiveDate = {
    month: 5,
    year: 2017
  };
  spentThisYear$: number = 30000;
  spentThisMonth$: number = 1000;
  getRunningSurplus$: number = 200;

  constructor(private db: Database) {
    db.open('budget');

  }

  previousMonth() {

  }
  nextMonth() {

  }

  addTransaction(transaction: Transaction) {    

    //insert does inserts and updates
     this.db.insert('transaction', [transaction])
       .subscribe(n => console.log(n));


    //this does deletes
    // this.db.executeWrite('transaction', 'delete', [ somePrimaryKeyId])
    //   .subscribe(n => console.log(n));

  }

  addCategory(categoryName: Category) {

    //this does a simple get by id
    //this.db.get('transaction', 'aa')
    //  .subscribe((n: Transaction) => alert(n.amount));

    //this does a get based on a query 
    this.db.query('transaction', n => n.amount == 3 )
      .subscribe(x => console.log(x));

  }
  ngOnInit() {
  }

}
