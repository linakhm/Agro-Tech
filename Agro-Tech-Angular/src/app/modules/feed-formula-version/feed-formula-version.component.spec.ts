import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedFormulaVersionComponent } from './feed-formula-version.component';

describe('FeedFormulaVersionComponent', () => {
  let component: FeedFormulaVersionComponent;
  let fixture: ComponentFixture<FeedFormulaVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedFormulaVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedFormulaVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
