import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItmoduleComponent } from './itmodule.component';

describe('ItmoduleComponent', () => {
  let component: ItmoduleComponent;
  let fixture: ComponentFixture<ItmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItmoduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
