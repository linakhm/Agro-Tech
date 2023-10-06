import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { SharedService } from "app/modules/company/services/shared.service";
import { Company } from "../../../models/comany";

@Component({
  selector: "app-company-from-localisation",
  templateUrl: "./company-from-localisation.component.html",
  styleUrls: ["./company-from-localisation.component.scss"],
})
export class CompanyFromLocalisationComponent implements OnInit {
  @Input() camp!: Company;
  addform: FormGroup;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  initForm() {
    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
    });
    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
  }

  geValues(event) {
    console.log("====================================");
    console.log("event :", event);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");

    this.sharedService.setIsActive(true);
  }

  get f() {
    return this.addform.controls;
  }

  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }
}
