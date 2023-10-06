import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFromGeneralComponent } from './company-from-general.component';

describe('CompanyFromGeneralComponent', () => {
  let component: CompanyFromGeneralComponent;
  let fixture: ComponentFixture<CompanyFromGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFromGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFromGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
