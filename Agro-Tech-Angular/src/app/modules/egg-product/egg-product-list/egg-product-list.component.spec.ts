import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EggProductListComponent } from './egg-product-list.component';

describe('EggProductListComponent', () => {
  let component: EggProductListComponent;
  let fixture: ComponentFixture<EggProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EggProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EggProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
