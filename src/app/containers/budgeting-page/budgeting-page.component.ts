import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { Subscription } from 'rxjs/Subscription';
import { everyCategoryTotalSelector, totalBudgetInfoSelector, monthlyBudgetInfoSelector,
  runningSurplusSelector } from './../../selectors/selectors';
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


  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute,
    private router: Router, private actionsCreatorService: ActionsCreatorService) {
  }

  ngOnInit() {


  }

  ngOnDestroy() {
  }

}
