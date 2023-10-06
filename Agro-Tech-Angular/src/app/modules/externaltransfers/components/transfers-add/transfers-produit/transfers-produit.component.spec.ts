import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersProduitComponent } from './transfers-produit.component';

describe('TransfersProduitComponent', () => {
  let component: TransfersProduitComponent;
  let fixture: ComponentFixture<TransfersProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
