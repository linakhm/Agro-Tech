import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginninginventoryDetailsComponent } from './beginninginventory-details.component';

describe('BeginninginventoryDetailsComponent', () => {
  let component: BeginninginventoryDetailsComponent;
  let fixture: ComponentFixture<BeginninginventoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginninginventoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeginninginventoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
