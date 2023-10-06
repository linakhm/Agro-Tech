import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterFormInformationComponent } from './cost-center-form-information.component';

describe('CostCenterFormInformationComponent', () => {
  let component: CostCenterFormInformationComponent;
  let fixture: ComponentFixture<CostCenterFormInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostCenterFormInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostCenterFormInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
