import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersAddComponent } from './transfers-add.component';

describe('TransfersAddComponent', () => {
  let component: TransfersAddComponent;
  let fixture: ComponentFixture<TransfersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
