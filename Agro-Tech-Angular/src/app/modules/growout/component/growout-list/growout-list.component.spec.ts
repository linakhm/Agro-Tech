import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowoutListComponent } from './growout-list.component';

describe('GrowoutListComponent', () => {
  let component: GrowoutListComponent;
  let fixture: ComponentFixture<GrowoutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowoutListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
