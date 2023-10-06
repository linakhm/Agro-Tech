import { Component, Input, OnInit } from "@angular/core";
import { Division } from "../../models/division";

@Component({
  selector: "app-division-form",
  templateUrl: "./division-form.component.html",
  styleUrls: ["./division-form.component.scss"],
})
export class DivisionFormComponent implements OnInit {
  @Input() division!: Division;
  @Input() currentStep!: number;
  wizardStep!: number;

  constructor() {}

  ngOnInit(): void {
    this.wizardStep = 1;
  }
}
