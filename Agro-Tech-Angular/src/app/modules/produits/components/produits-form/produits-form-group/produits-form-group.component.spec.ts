import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsFormGroupComponent } from './produits-form-group.component';

describe('ProduitsFormGroupComponent', () => {
  let component: ProduitsFormGroupComponent;
  let fixture: ComponentFixture<ProduitsFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsFormGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitsFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
