import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { Division } from "app/modules/division/models/division";
import { DivisionService } from "app/modules/division/services/division.service";
import { Growout } from "app/modules/growout/models/growout";

@Component({
  selector: "app-growout-form-general",
  templateUrl: "./growout-form-general.component.html",
  styleUrls: ["./growout-form-general.component.scss"],
})
export class GrowoutFormGeneralComponent implements OnInit {
  @Input() growout!: Growout;
  @ViewChild("myForm") myForm: NgForm;
  divisions: Array<Division> = [];

  formData = {
    name: "",
    email: "",
    message: "",
  };

  currentStep = 1;

  addform: FormGroup;

  constructor(private sharedService: SharedService, private divisionService: DivisionService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAlldivision()
  }
  getAlldivision() {
    this.divisionService.findAll().subscribe({
      next: (result) => { this.divisions = result; console.log("2==", result) },
      error: (error) => console.error(error),
    });
  }


  selectVAlue(e:any){
    console.log("3==",e.target.value)
    let t=this.divisions.filter(el=>{return el.code==e.target.value})[0].name
    this.addform.value.nameCity=t
    this.growout.nameCity=t
    console.log("3==",this.addform.value)
    console.log("5==",this.growout)

    console.log("4==",t)

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
      codeCity: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      nameCity: new FormControl("", [
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

    console.log(this.growout.code);
    console.log(this.growout.name);
    console.log(this.growout.codeCity);
    console.log(this.growout.nameCity);
    console.log(
      "this.growout.code.length",
      this.growout.code.toString().length >= 5
    );
    console.log(
      this.growout.code != null &&
      this.growout.code != "" &&
      this.growout.name != null &&
      this.growout.name != "" &&
      this.growout.codeCity != null &&
      this.growout.codeCity != "" &&
      this.growout.nameCity != null &&
      this.growout.nameCity != "" &&
      this.growout.code.toString().length >= 5 &&
      this.growout.name.toString().length >= 3 &&
      this.growout.codeCity.toString().length >= 5 &&
      this.growout.nameCity.toString().length >= 3
    );
    if (
      this.growout.code != null &&
      this.growout.code != "" &&
      this.growout.name != null &&
      this.growout.name != "" &&
      this.growout.codeCity != null &&
      this.growout.codeCity != "" &&
      this.growout.nameCity != null &&
      this.growout.nameCity != "" &&
      this.growout.code.toString().length >= 5 &&
      this.growout.name.toString().length >= 3 &&
      this.growout.codeCity.toString().length >= 5 &&
      this.growout.nameCity.toString().length >= 3
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }

  get f() {
    return this.addform.controls;
  }

  isControlValid(controlCode: string): boolean {
    const control = this.addform.controls[controlCode];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;


  isBlurDCisvalid() {
    if (this.growout.code.toString().length < 5) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }

  isBlurDNisvalid() {
    if (this.growout.name.toString().length < 3) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }

  isBlurSTisvali() {
    if (this.growout.codeCity.toString().length < 3) { this.STisvali = true }
    else {
      this.STisvali = false
    }
  }

  isBlurMisvalid() {
    if (this.growout.nameCity.toString().length < 3) { this.Misvalid = true }
    else {
      this.Misvalid = false
    }
  }

}
