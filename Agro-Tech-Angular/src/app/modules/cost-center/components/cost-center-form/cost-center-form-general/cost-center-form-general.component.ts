import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { CostCenter } from "app/modules/cost-center/model/cost-center";
import { CostCenterService } from "app/modules/cost-center/services/cost-center.service";

@Component({
  selector: "app-cost-center-form-general",
  templateUrl: "./cost-center-form-general.component.html",
  styleUrls: ["./cost-center-form-general.component.scss"],
})
export class CostCenterFormGeneralComponent implements OnInit {
  errormessage: string;
  CostcenterFormGroup!: FormGroup;

  @Input() cost!: CostCenter;
  @ViewChild("addform")
  addform: FormGroup;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.initForm();
  }

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

  nom: string = "";
  code: string = "";
  isNomValid() {
    return this.nom.length > 5;
  }

  isCodeValid() {
    return this.nom.length > 5;
  }
  geValuesCode(event) {
    this.cost.code = event.target.value;
    console.log("====================================");
    console.log("eventcode :", event.target.value);
    console.log("====================================");
    if (
      this.cost.code != null &&
      this.cost.code != "" &&
      this.cost.name != null &&
      this.cost.name != "" &&
      this.cost.code.toString().length >= 5 &&
      this.cost.name.toString().length >= 3
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  geValuesNom(event) {
    this.cost.name = event.target.value;
    console.log("====================================");
    console.log("eventname :", event.target.value);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");

    if (
      this.cost.code != null &&
      this.cost.code != "" &&
      this.cost.name != null &&
      this.cost.name != "" &&
      this.cost.code.toString().length >= 5 &&
      this.cost.name.toString().length >= 3
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
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

  minIstrueCode: boolean = false;
  isBlur() {
    if (this.cost.code.toString().length < 5) {
      this.minIstrueCode = true;
    } else {
      this.minIstrueCode = false;
    }
  }

  minIstrueName: boolean = false;
  isBlur1() {
    if (this.cost.name.toString().length < 3) {
      this.minIstrueName = true;
    } else {
      this.minIstrueName = false;
    }
  }
}
