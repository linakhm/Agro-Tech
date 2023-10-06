import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionFromLocalisationComponent } from './division-from-localisation.component';

describe('DivisionFromLocalisationComponent', () => {
  let component: DivisionFromLocalisationComponent;
  let fixture: ComponentFixture<DivisionFromLocalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionFromLocalisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionFromLocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
