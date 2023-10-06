import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowoutFormGeneralComponent } from './growout-form-general.component';

describe('GrowoutFormGeneralComponent', () => {
  let component: GrowoutFormGeneralComponent;
  let fixture: ComponentFixture<GrowoutFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowoutFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowoutFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
