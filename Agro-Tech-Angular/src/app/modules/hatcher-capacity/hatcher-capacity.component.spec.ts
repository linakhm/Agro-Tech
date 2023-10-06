import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HatcherCapacityComponent } from './hatcher-capacity.component';

describe('HatcherCapacityComponent', () => {
  let component: HatcherCapacityComponent;
  let fixture: ComponentFixture<HatcherCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HatcherCapacityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HatcherCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
