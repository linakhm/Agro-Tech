import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanyListComponent } from './campany-list.component';

describe('CampanyListComponent', () => {
  let component: CampanyListComponent;
  let fixture: ComponentFixture<CampanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampanyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
