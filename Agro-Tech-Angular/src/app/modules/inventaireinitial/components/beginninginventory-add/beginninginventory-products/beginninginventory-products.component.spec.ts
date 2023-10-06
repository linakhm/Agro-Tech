import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginninginventoryProductsComponent } from './beginninginventory-products.component';

describe('BeginninginventoryProductsComponent', () => {
  let component: BeginninginventoryProductsComponent;
  let fixture: ComponentFixture<BeginninginventoryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginninginventoryProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeginninginventoryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
