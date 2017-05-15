import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBudgetPageComponent } from './create-budget-page.component';

describe('CreateBudgetPageComponent', () => {
  let component: CreateBudgetPageComponent;
  let fixture: ComponentFixture<CreateBudgetPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBudgetPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBudgetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
