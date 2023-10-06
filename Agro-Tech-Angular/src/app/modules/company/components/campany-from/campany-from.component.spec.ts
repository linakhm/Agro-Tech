import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanyFromComponent } from './campany-from.component';

describe('CampanyFromComponent', () => {
  let component: CampanyFromComponent;
  let fixture: ComponentFixture<CampanyFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampanyFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampanyFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
