import { Component, Input, OnInit } from "@angular/core";
import { Division } from "../../../models/division";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";

@Component({
  selector: "app-division-form-general",
  templateUrl: "./division-form-general.component.html",
  styleUrls: ["./division-form-general.component.scss"],
})
export class DivisionFormGeneralComponent implements OnInit {
  @Input() division!: Division;
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
      speciesType: new FormControl("", [
        // Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(8),
      ]),
      measurement: new FormControl("", [
        // Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(8),
      ]),
    });
    // console.log("====================================");
    // console.log(" add form :", this.addform);
    // console.log("====================================");
  }

  MeasurementToValidate:boolean=false
  setSpeciesTypeValue(){
    console.log("1452",this.addform.value)
    console.log("1352",this.addform.value.measurement=="" || this.addform.value.measurement== undefined)

    if(this.addform.value.speciesType!=""  && (this.addform.value.measurement=="" || this.addform.value.measurement== undefined) ){
      this.MeasurementToValidate= true
    }else{
      this.MeasurementToValidate= false
    }
  }


  geValues(event) {
    // console.log("====================================");
    // console.log("event :", event);
    // console.log("====================================");

    // console.log("====================================");
    // console.log("le formulaire :", this.addform);
    // console.log("====================================");

    // console.log(this.division.code);
    // console.log(this.division.name);
    // console.log(
    //   "this.division.code.length",
    //   this.division.code.toString().length >= 5
    // );
    // console.log(
    //   this.division.code != null &&
    //     this.division.code != "" &&
    //     this.division.name != null &&
    //     this.division.name != "" &&
    //     this.division.code.toString().length >= 5 &&
    //     this.division.name.toString().length >= 3
    // );
    if (
      this.addform.value.code != null &&
      this.addform.value.code != "" &&
      this.addform.value.name != null &&
      this.addform.value.name != "" &&
      !this.MeasurementToValidate

    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }

  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;

  isBlurDCisvalid() {
    if (this.division.code.toString().length < 5) {
      this.DCisvalid = true;
    } else {
      this.DCisvalid = false;
    }
  }

  isBlurDNisvalid() {
    if (this.division.name.toString().length < 3) {
      this.DNisvalid = true;
    } else {
      this.DNisvalid = false;
    }
  }

  isBlurSTisvali() {
    if ((this.division.speciesType.toString().length < 3)||(this.division.speciesType.toString().length > 20)) {
      this.STisvali = true;
    } else {
      this.STisvali = false;
    }
  }

  isBlurMisvalid() {
    if ((this.division.measurement.toString().length < 3)||(this.division.measurement.toString().length > 10)) {
      this.Misvalid = true;
    } else {
      this.Misvalid = false;
    }
  }

  get f() {
    return this.addform.controls;
  }

  isControlValid(controlCode: string): boolean {
    const control = this.addform.controls[controlCode];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlSpeciesType: string): boolean {
    const control = this.addform.controls[controlSpeciesType];
    return control.invalid && (control.dirty || control.touched);
  }
}
