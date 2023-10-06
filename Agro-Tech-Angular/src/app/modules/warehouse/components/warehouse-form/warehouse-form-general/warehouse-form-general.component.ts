import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Warehouse } from "../../../models/warehouse.model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { SharedService } from "app/modules/company/services/shared.service";

@Component({
  selector: "app-warehouse-form-general",
  templateUrl: "./warehouse-form-general.component.html",
  styleUrls: ["./warehouse-form-general.component.scss"],
})
export class WarehouseFormGeneralComponent implements OnInit {
  @Input()
  warehouse: Warehouse = {};

  costCenterTypes = ["ADMIN", "INTERNAL", "EXTERNAL"];

  types = ["OWNED", "THIRD PARTY"];

  vendors = ["Vendor 1", "Vendor 2", "Vendor 3"];

  myForm!: FormGroup;
  addForm!: FormGroup;

  // initialisation du formulaire
  constructor(private fb: FormBuilder, private sharedService: SharedService) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.myForm = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.email,
      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
    });
    this.addForm = this.fb.group({
      code: ["", Validators.required],//5
      name: ["", Validators.required],//3
      facilityType: ["", Validators.required],
      vendor: ["", Validators.required],
      costCenterCode: ["", Validators.required],
      costCenterName: ["", Validators.required],
      costCenterType: ["", Validators.required],
      divisionName: ["", Validators.required],
      divisionCode: ["", Validators.required],
      startingDate: ["", Validators.required],
      isPrimary: ["", Validators.required],

      email: ["", Validators.required],
    });

    // console.log("====================================");
    // console.log(" add form :", this.myForm);
    // console.log("====================================");
  }

  geValues(event) {
    // console.log("====================================");
    // console.log("event :", event);
    // console.log("====================================");

    // console.log("====================================");
    // console.log("le formulaire :", this.myForm);
    // console.log("====================================");

    // console.log(this.warehouse.code);
    // console.log(this.warehouse.name);
    // console.log(
    //   "this.warehouse.code.length",
    //   this.warehouse.code.toString().length >= 5
    // );
    // console.log(
    //   this.warehouse.code != null &&
    //     this.warehouse.code != "" &&
    //     this.warehouse.name != null &&
    //     this.warehouse.name != "" &&
    //     this.warehouse.type != null &&
    //     this.warehouse.type != "" &&
    //     this.warehouse.code.toString().length >= 5 &&
    //     this.warehouse.name.toString().length >= 3
    // );
    if (
      this.warehouse.code != null &&
      this.warehouse.code != "" &&
      this.warehouse.name != null &&
      this.warehouse.name != "" &&
      this.warehouse.type != null &&
      this.warehouse.type != "" &&
      this.warehouse.code.toString().length >= 5 &&
      this.warehouse.name.toString().length >= 3&&
      this.warehouse.costCenterCode.toString().length >= 3&&
      this.warehouse.costCenterName.toString().length >= 3
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
    
  }

  PrimaryisValid:boolean=true
  isPrimaryValid(){
    if(this.addForm.value.isPrimary=="false" || this.addForm.value.isPrimary=="true"){
      this.PrimaryisValid=false
    }
  }


  facilityTypeisValid:boolean=true

  isfacilityTypeValid(event){

    console.log("snl",  this.addForm.value.facilityType )
    if(this.addForm.value.facilityType=="OWNED" || this.addForm.value.facilityType=="THIRD PARTY"){
      this.facilityTypeisValid=false
    }
    this.geValues(event)
  }


  isControlValid(controlName: string): boolean {
    const control = this.myForm.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  isControlInValid(controlName: string): boolean {
    const control = this.myForm.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  onTypeChange() {
    if (this.warehouse.type !== "THIRD PARTY") {
      this.warehouse.vendor = null;
    }
  }

  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  isBlurDCisvalid() {
    this.DCisvalid1=true
    this.DCisvalid2=true
    if (this.warehouse.code.toString().length < 5) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }

  isBlurDNisvalid() {
    this.DNisvalid1 = true
    this.DNisvalid2 = true
    if (this.warehouse.name.toString().length < 3) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }


  CCCisvalid: boolean = false;
  CCNisvalid: boolean = false;
  isBlurCCCisvalid() {
    this.CCCisvalid1 = true
    this.CCCisvalid2 = true

    if (this.warehouse.costCenterCode.toString().length < 5) { this.CCCisvalid = true }
    else {
      this.CCCisvalid = false
    }
  }

  isBlurCCNisvalid() {
    this.CCNisvalid1 = true
    this.CCNisvalid2 = true
    if (this.warehouse.costCenterName.toString().length < 3) { this.CCNisvalid = true }
    else {
      this.CCNisvalid = false
    }
  }

  maiLisvalid: boolean = false;
  isMaiLisvalid() {
    console.log("1111",this.warehouse.email.toString().length < 3 )
    console.log("222",this.warehouse.email.toString().includes("@"))
    console.log("222",this.warehouse.email.toString().includes("."))
    this.maiLisvalid1 = true

    if (this.warehouse.email.toString().length < 3 || !this.warehouse.email.toString().includes("@")  || !this.warehouse.email.toString().includes(".")) { this.maiLisvalid = true }
    else {
      this.maiLisvalid = false
    }
  }
  CCCisvalid1: boolean = false
  CCNisvalid1: boolean = false
  DNisvalid1: boolean = false
  DCisvalid1: boolean = false
  isprimaryvalidation(){
    return( this.CCCisvalid1 &&  this.CCNisvalid1 && this.DNisvalid1 &&  this.DCisvalid1 &&this.addForm.value.isPrimary==""
      )
  } 
  
  CCCisvalid2: boolean = false
  CCNisvalid2: boolean = false
  DNisvalid2: boolean = false
  DCisvalid2: boolean = false
  maiLisvalid1: boolean = false
  isprimarytype(){
    console.log("esese",typeof this.addForm.value.facilityType);
    
    return( this.CCCisvalid2 &&  this.CCNisvalid2 && this.DNisvalid2 &&  this.DCisvalid2 &&(this.addForm.value.facilityType==undefined)
      )
  }


}
