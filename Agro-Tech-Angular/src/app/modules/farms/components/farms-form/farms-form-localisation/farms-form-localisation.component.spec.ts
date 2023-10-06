import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsFormLocalisationComponent } from './farms-form-localisation.component';

describe('FarmsFormLocalisationComponent', () => {
  let component: FarmsFormLocalisationComponent;
  let fixture: ComponentFixture<FarmsFormLocalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsFormLocalisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmsFormLocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
