import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLogoutComponent } from './base-logout.component';

describe('BaseLogoutComponent', () => {
  let component: BaseLogoutComponent;
  let fixture: ComponentFixture<BaseLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
