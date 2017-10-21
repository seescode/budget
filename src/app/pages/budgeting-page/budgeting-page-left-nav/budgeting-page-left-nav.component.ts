// import { Subscription } from 'rxjs/Subscription';
// import { Observable } from 'rxjs/Observable';
// import { totalBudgetPieDataSelector, monthlyBudgetPieDataSelector } from './../../../selectors/selectors';
// import { AppState } from './../../../reducers/index';
// import { Store } from '@ngrx/store';
// import { PieData } from './../../../components/pie/pie.interface';
// import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';

// @Component({
//   selector: 'yb-budgeting-page-left-nav',
//   templateUrl: './budgeting-page-left-nav.component.html',
//   styleUrls: ['./budgeting-page-left-nav.component.css']
// })
// export class BudgetingPageLeftNavComponent implements OnInit, OnDestroy {

//   totalBudgetPieDataSubscription: Subscription;
//   monthlyBudgetPieDataSubscription: Subscription;

//   renderPie: EventEmitter<any> = new EventEmitter<any>();
//   renderPie2: EventEmitter<any> = new EventEmitter<any>();

//   constructor(private store: Store<AppState>) {
//   }

//   ngOnInit() {
//     this.totalBudgetPieDataSubscription = this.store.select(totalBudgetPieDataSelector)
//       .subscribe(n => {
//         this.renderPie.emit(n);
//       });

//     this.monthlyBudgetPieDataSubscription = this.store.select(monthlyBudgetPieDataSelector)
//       .subscribe(n => {
//         this.renderPie2.emit(n);
//       });
//   }

//   ngOnDestroy() {
//     this.totalBudgetPieDataSubscription.unsubscribe();
//     this.monthlyBudgetPieDataSubscription.unsubscribe();
//   }
// }
