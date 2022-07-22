import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRModuleComponent } from './hrmodule.component';

describe('HRModuleComponent', () => {
  let component: HRModuleComponent;
  let fixture: ComponentFixture<HRModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HRModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
