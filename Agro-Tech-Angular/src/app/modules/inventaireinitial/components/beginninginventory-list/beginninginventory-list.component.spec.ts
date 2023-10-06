import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginninginventoryListComponent } from './beginninginventory-list.component';

describe('BeginninginventoryListComponent', () => {
  let component: BeginninginventoryListComponent;
  let fixture: ComponentFixture<BeginninginventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginninginventoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeginninginventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
