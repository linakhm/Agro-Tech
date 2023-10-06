import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EggClassComponent } from './egg-class.component';

describe('EggClassComponent', () => {
  let component: EggClassComponent;
  let fixture: ComponentFixture<EggClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EggClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EggClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
