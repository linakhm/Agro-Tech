import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternaltransfersComponent } from './externaltransfers.component';

describe('ExternaltransfersComponent', () => {
  let component: ExternaltransfersComponent;
  let fixture: ComponentFixture<ExternaltransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternaltransfersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternaltransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
