import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTypeComponent } from './feed-type.component';

describe('FeedTypeComponent', () => {
  let component: FeedTypeComponent;
  let fixture: ComponentFixture<FeedTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
