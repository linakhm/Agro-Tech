import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseFormGeneralComponent } from './warehouse-form-general.component';

describe('WarehouseFormGeneralComponent', () => {
  let component: WarehouseFormGeneralComponent;
  let fixture: ComponentFixture<WarehouseFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
