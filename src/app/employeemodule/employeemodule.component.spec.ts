import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeemoduleComponent } from './employeemodule.component';

describe('EmployeemoduleComponent', () => {
  let component: EmployeemoduleComponent;
  let fixture: ComponentFixture<EmployeemoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeemoduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeemoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
