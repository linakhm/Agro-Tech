import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedFormulaComponent } from './feed-formula.component';

describe('FeedFormulaComponent', () => {
  let component: FeedFormulaComponent;
  let fixture: ComponentFixture<FeedFormulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedFormulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
