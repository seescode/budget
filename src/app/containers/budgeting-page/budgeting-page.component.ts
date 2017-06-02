import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { Subscription } from 'rxjs/Subscription';
import {
  getSelectedBudgetName
} from './../../selectors/selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from './../../reducers/index';
import { ActiveDate, Budget, Transaction, Category, TotalBudgetInfo } from './../../models/interfaces';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'yb-budgeting-page',
  templateUrl: './budgeting-page.component.html',
  styleUrls: ['./budgeting-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetingPageComponent implements OnInit, OnDestroy {

  leftNavDisplayMode: string;
  rightNavDisplayMode: string;
  leftNavOpened: string;
  rightNavOpened: string;
  selectedMonthAndYear$: ActiveDate;
  budgetId: string;
  selectedBudgetName: Observable<string>;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute,
    private router: Router, private actionsCreatorService: ActionsCreatorService) {
      this.selectedBudgetName = store.select(getSelectedBudgetName);
  }

  ngOnInit() {
    const width = window.innerWidth;
    this.resizeScreen(width);

    // TODO should unsubscribe in ngDestroy
    this.activatedRoute.params.subscribe(params => {
      this.budgetId = params['budgetId'];

      this.selectedMonthAndYear$ = {
        month: parseInt(params['month']),
        year: parseInt(params['year'])
      };

      // TODO move to a service or pipe
      switch (this.selectedMonthAndYear$.month) {
        case 1:
          this.selectedMonthAndYear$.fullMonth = 'January';
          break;
        case 2:
          this.selectedMonthAndYear$.fullMonth = 'February';
          break;
        case 3:
          this.selectedMonthAndYear$.fullMonth = 'March';
          break;
        case 4:
          this.selectedMonthAndYear$.fullMonth = 'April';
          break;
        case 5:
          this.selectedMonthAndYear$.fullMonth = 'May';
          break;
        case 6:
          this.selectedMonthAndYear$.fullMonth = 'June';
          break;
        case 7:
          this.selectedMonthAndYear$.fullMonth = 'July';
          break;
        case 8:
          this.selectedMonthAndYear$.fullMonth = 'August';
          break;
        case 9:
          this.selectedMonthAndYear$.fullMonth = 'September';
          break;
        case 10:
          this.selectedMonthAndYear$.fullMonth = 'October';
          break;
        case 11:
          this.selectedMonthAndYear$.fullMonth = 'November';
          break;
        case 12:
          this.selectedMonthAndYear$.fullMonth = 'December';
          break;
      }
    });
  }

  ngOnDestroy() {
  }

  resizeScreen(width: number) {
    if (width <= 900) {
      this.leftNavDisplayMode = 'push';
      this.rightNavDisplayMode = 'push';
      this.leftNavOpened = 'false';
      this.rightNavOpened = 'false';
    } else {
      this.leftNavDisplayMode = 'side';
      this.rightNavDisplayMode = 'side';
      this.leftNavOpened = 'true';
      this.rightNavOpened = 'true';
      console.log('side', width);
    }
  }

  onResize(event: any) {

    const width: number = parseInt(event.target.innerWidth);

    this.resizeScreen(width);
  }

  previousMonth() {
    let month = this.selectedMonthAndYear$.month - 1;
    let year = this.selectedMonthAndYear$.year;

    if (month === 0) {
      year--;
      month = 12;
    }

    this.router.navigate(['/budgeting', this.budgetId, year, month]);
  }

  nextMonth() {
    let month = this.selectedMonthAndYear$.month + 1;
    let year = this.selectedMonthAndYear$.year;

    if (month > 12) {
      year++;
      month = 1;
    }

    this.router.navigate(['/budgeting', this.budgetId, year, month]);
  }

}
