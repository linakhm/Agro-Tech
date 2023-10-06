import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeAssignmentComponent } from './age-assignment.component';

describe('AgeAssignmentComponent', () => {
  let component: AgeAssignmentComponent;
  let fixture: ComponentFixture<AgeAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
