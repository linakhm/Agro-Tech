import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseursFormComponent } from './fournisseurs-form.component';

describe('FournisseursFormComponent', () => {
  let component: FournisseursFormComponent;
  let fixture: ComponentFixture<FournisseursFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseursFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
