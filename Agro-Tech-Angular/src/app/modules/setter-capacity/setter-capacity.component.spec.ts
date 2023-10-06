import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetterCapacityComponent } from './setter-capacity.component';

describe('SetterCapacityComponent', () => {
  let component: SetterCapacityComponent;
  let fixture: ComponentFixture<SetterCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetterCapacityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetterCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
