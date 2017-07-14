import { AppState, CustomObject } from './../../reducers/budget.reducer';
import { Router } from '@angular/router';
import { Budget } from './../../models/interfaces';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-budget-list-page',
  templateUrl: './budget-list-page.component.html',
  styleUrls: ['./budget-list-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetListPageComponent implements OnInit {

customObjects: CustomObject[];

constructor(private appStore: Store<AppState>) {
  appStore.select(store => store.Main)
    .subscribe(objs => {
      this.customObjects = objs;
      console.log(this.customObjects);
    })
}

ngOnInit() {
}


loadCustomObjects() {
  let initialItems: CustomObject[] = [
    {
      directoryName: "d_name_1",
      brokenLinks: 0,
    },
    {
      directoryName: "d_name_2",
      brokenLinks: 0,
    }
  ];

  this.appStore.dispatch({ type: 'LOAD_CUSTOM_OBJECTS', payload: initialItems });
}
}
