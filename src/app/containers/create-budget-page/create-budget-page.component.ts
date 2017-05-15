import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yb-create-budget-page',
  templateUrl: './create-budget-page.component.html',
  styleUrls: ['./create-budget-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateBudgetPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
