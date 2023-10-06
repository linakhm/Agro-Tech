import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowoutFormLocationComponent } from './growout-form-location.component';

describe('GrowoutFormLocationComponent', () => {
  let component: GrowoutFormLocationComponent;
  let fixture: ComponentFixture<GrowoutFormLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowoutFormLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowoutFormLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
