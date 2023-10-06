import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsFormVendorSkuComponent } from './produits-form-vendor-sku.component';

describe('ProduitsFormVendorSkuComponent', () => {
  let component: ProduitsFormVendorSkuComponent;
  let fixture: ComponentFixture<ProduitsFormVendorSkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsFormVendorSkuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitsFormVendorSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
