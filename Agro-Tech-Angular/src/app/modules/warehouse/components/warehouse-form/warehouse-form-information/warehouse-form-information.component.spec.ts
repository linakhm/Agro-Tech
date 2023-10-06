import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseFormInformationComponent } from './warehouse-form-information.component';

describe('WarehouseFormInformationComponent', () => {
  let component: WarehouseFormInformationComponent;
  let fixture: ComponentFixture<WarehouseFormInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseFormInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseFormInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
