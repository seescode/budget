import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-budget-list-page',
  templateUrl: './budget-list-page.component.html',
  styleUrls: ['./budget-list-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetListPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
