import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryPageComponent } from './edit-category-page.component';

describe('EditCategoryPageComponent', () => {
  let component: EditCategoryPageComponent;
  let fixture: ComponentFixture<EditCategoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
