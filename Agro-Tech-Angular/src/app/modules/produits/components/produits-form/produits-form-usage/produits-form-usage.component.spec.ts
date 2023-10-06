import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsFormUsageComponent } from './produits-form-usage.component';

describe('ProduitsFormUsageComponent', () => {
  let component: ProduitsFormUsageComponent;
  let fixture: ComponentFixture<ProduitsFormUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsFormUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitsFormUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
