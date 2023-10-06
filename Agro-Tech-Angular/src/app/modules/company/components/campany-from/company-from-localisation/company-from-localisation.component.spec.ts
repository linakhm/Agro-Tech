import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFromLocalisationComponent } from './company-from-localisation.component';

describe('CompanyFromLocalisationComponent', () => {
  let component: CompanyFromLocalisationComponent;
  let fixture: ComponentFixture<CompanyFromLocalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFromLocalisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFromLocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
