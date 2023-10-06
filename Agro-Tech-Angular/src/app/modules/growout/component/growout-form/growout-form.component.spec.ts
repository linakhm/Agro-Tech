import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowoutFormComponent } from './growout-form.component';

describe('GrowoutFormComponent', () => {
  let component: GrowoutFormComponent;
  let fixture: ComponentFixture<GrowoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowoutFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
