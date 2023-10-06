import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseursFormVendorSkuComponent } from './fournisseurs-form-vendor-sku.component';

describe('FournisseursFormVendorSkuComponent', () => {
  let component: FournisseursFormVendorSkuComponent;
  let fixture: ComponentFixture<FournisseursFormVendorSkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseursFormVendorSkuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseursFormVendorSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
