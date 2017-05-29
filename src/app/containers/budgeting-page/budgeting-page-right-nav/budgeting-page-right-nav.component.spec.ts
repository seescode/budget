import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetingPageRightNavComponent } from './budgeting-page-right-nav.component';

describe('BudgetingPageRightNavComponent', () => {
  let component: BudgetingPageRightNavComponent;
  let fixture: ComponentFixture<BudgetingPageRightNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetingPageRightNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetingPageRightNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
