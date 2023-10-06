import { Component, Input, OnInit } from "@angular/core";
import { Company } from "../../models/comany";

@Component({
  selector: "app-campany-from",
  templateUrl: "./campany-from.component.html",
  styleUrls: ["./campany-from.component.scss"],
})
export class CampanyFromComponent implements OnInit {
  @Input() camp!: Company;
  @Input() currentStep!: number;
  wizardStep!: number;

  constructor() {}

  ngOnInit(): void {
    this.wizardStep = 1;
  }
}
