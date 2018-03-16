import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolverDialogComponent } from './add-solver-dialog.component';

describe('AddSolverDialogComponent', () => {
  let component: AddSolverDialogComponent;
  let fixture: ComponentFixture<AddSolverDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSolverDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSolverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
