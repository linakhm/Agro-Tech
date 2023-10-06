import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseursFormInformationComponent } from './fournisseurs-form-information.component';

describe('FournisseursFormInformationComponent', () => {
  let component: FournisseursFormInformationComponent;
  let fixture: ComponentFixture<FournisseursFormInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseursFormInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseursFormInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
