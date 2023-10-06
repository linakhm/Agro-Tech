import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterFormGeneralComponent } from './cost-center-form-general.component';

describe('CostCenterFormGeneralComponent', () => {
  let component: CostCenterFormGeneralComponent;
  let fixture: ComponentFixture<CostCenterFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostCenterFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
