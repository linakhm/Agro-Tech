import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsFormSalesSkuComponent } from './produits-form-sales-sku.component';

describe('ProduitsFormSalesSkuComponent', () => {
  let component: ProduitsFormSalesSkuComponent;
  let fixture: ComponentFixture<ProduitsFormSalesSkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsFormSalesSkuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitsFormSalesSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
