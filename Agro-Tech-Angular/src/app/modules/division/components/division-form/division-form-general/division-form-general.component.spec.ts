import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionFormGeneralComponent } from './division-form-general.component';

describe('DivisionFormGeneralComponent', () => {
  let component: DivisionFormGeneralComponent;
  let fixture: ComponentFixture<DivisionFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
