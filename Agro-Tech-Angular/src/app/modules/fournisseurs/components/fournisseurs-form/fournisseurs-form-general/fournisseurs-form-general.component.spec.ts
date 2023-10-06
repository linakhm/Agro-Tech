import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseursFormGeneralComponent } from './fournisseurs-form-general.component';

describe('FournisseursFormGeneralComponent', () => {
  let component: FournisseursFormGeneralComponent;
  let fixture: ComponentFixture<FournisseursFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseursFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseursFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
