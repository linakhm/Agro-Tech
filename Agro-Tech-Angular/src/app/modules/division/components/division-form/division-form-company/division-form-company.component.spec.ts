import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionFormCompanyComponent } from './division-form-company.component';

describe('DivisionFormCompanyComponent', () => {
  let component: DivisionFormCompanyComponent;
  let fixture: ComponentFixture<DivisionFormCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionFormCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionFormCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
