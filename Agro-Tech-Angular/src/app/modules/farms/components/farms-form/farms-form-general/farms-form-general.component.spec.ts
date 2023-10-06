import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsFormGeneralComponent } from './farms-form-general.component';

describe('FarmsFormGeneralComponent', () => {
  let component: FarmsFormGeneralComponent;
  let fixture: ComponentFixture<FarmsFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmsFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
