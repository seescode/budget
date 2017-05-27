import { ActionsCreatorService } from './../../actions/actionsCreatorService';
import { Router } from '@angular/router';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Budget } from './../../models/interfaces';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'yb-create-budget-page',
  templateUrl: './create-budget-page.component.html',
  styleUrls: ['./create-budget-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBudgetPageComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router,
    private actionsCreatorService: ActionsCreatorService) { }

  ngOnInit() {
  }

  create() {
    this.store.dispatch(this.actionsCreatorService.addBudget());

    this.router.navigateByUrl('/budget-list');
  }
}
