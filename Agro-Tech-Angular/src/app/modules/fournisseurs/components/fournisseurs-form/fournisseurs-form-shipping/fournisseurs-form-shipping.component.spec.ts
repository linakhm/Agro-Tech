import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseursFormShippingComponent } from './fournisseurs-form-shipping.component';

describe('FournisseursFormShippingComponent', () => {
  let component: FournisseursFormShippingComponent;
  let fixture: ComponentFixture<FournisseursFormShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseursFormShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseursFormShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
