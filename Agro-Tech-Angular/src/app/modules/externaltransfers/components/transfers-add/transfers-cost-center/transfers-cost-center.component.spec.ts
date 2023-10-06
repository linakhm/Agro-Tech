import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersCostCenterComponent } from './transfers-cost-center.component';

describe('TransfersCostCenterComponent', () => {
  let component: TransfersCostCenterComponent;
  let fixture: ComponentFixture<TransfersCostCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersCostCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersCostCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
