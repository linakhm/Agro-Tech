import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginninginventoryAddComponent } from './beginninginventory-add.component';

describe('BeginninginventoryAddComponent', () => {
  let component: BeginninginventoryAddComponent;
  let fixture: ComponentFixture<BeginninginventoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginninginventoryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeginninginventoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
