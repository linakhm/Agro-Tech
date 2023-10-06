import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Company } from "../../../models/comany";
import { SharedService } from "app/modules/company/services/shared.service";
@Component({
  selector: "app-company-from-general",
  templateUrl: "./company-from-general.component.html",
  styleUrls: ["./company-from-general.component.scss"],
})
export class CompanyFromGeneralComponent implements OnInit {
  @Input() camp!: Company;

  @ViewChild("addform")
  addform: FormGroup;

  constructor(private sharedService: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.camp == undefined) { this.camp = { name: "", code: "" } };
    this.initForm();
    console.log(this.addform);
  }

  initForm() {
    this.addform = this.fb.group({
      code: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
      name: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
    });

  }

  minIstrueCode: boolean = false
  isBlur() {

    if (this.camp.code.toString().length < 5) { this.minIstrueCode = true }
    else {
      this.minIstrueCode = false
    }
  }

  minIstrueName: boolean = false
  isBlur1() {

    if (this.camp.name.toString().length < 3) { this.minIstrueName = true }
    else {
      this.minIstrueName = false
    }
  }
  geValues(event) {

    if (
      this.camp.code != null &&
      this.camp.code != "" &&
      this.camp.name != null &&
      this.camp.name != "" &&
      this.camp.code.toString().length >= 5 &&
      this.camp.name.toString().length >= 3
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }

  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  get f() {
    return this.addform.controls;
  }
}
