import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyFormGeneralComponent } from './currency-form-general.component';

describe('CurrencyFormGeneralComponent', () => {
  let component: CurrencyFormGeneralComponent;
  let fixture: ComponentFixture<CurrencyFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
