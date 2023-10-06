import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginninginventoryTransactionsComponent } from './beginninginventory-transactions.component';

describe('BeginninginventoryTransactionsComponent', () => {
  let component: BeginninginventoryTransactionsComponent;
  let fixture: ComponentFixture<BeginninginventoryTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginninginventoryTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeginninginventoryTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
