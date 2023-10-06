import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedFormulaPriceComponent } from './feed-formula-price.component';

describe('FeedFormulaPriceComponent', () => {
  let component: FeedFormulaPriceComponent;
  let fixture: ComponentFixture<FeedFormulaPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedFormulaPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedFormulaPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
