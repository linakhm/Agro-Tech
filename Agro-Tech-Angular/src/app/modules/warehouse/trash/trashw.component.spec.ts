import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrashWComponent } from "./trashw.component";

describe("TrashComponent", () => {
  let component: TrashWComponent;
  let fixture: ComponentFixture<TrashWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrashWComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrashWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
