import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedCodeTypeComponent } from './breed-code-type.component';

describe('BreedCodeTypeComponent', () => {
  let component: BreedCodeTypeComponent;
  let fixture: ComponentFixture<BreedCodeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedCodeTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedCodeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
