import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnReimbursementComponent } from './own-reimbursement.component';

describe('OwnReimbursementComponent', () => {
  let component: OwnReimbursementComponent;
  let fixture: ComponentFixture<OwnReimbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnReimbursementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
