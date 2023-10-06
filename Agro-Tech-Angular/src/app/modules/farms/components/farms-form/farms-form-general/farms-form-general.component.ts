import { Component, OnInit, Input } from "@angular/core";
import { Fournisseur } from "app/modules/fournisseurs/models/fournisseur.model";
import { FournisseursService } from "app/modules/fournisseurs/services/fournisseurs.service";
import { Warehouse } from "app/modules/warehouse/models/warehouse.model";
import { WarehouseService } from "app/modules/warehouse/services/warehouse.service";
import { Farm } from "../../../models/farm";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";

@Component({
  selector: "app-farms-form-general",
  templateUrl: "./farms-form-general.component.html",
  styleUrls: ["./farms-form-general.component.scss"],
})
export class FarmsFormGeneralComponent implements OnInit {
  @Input() farm!: Farm;
  warehouses: Warehouse[] = [];
  vendors: Fournisseur[] = [];
  addform: FormGroup;

  constructor(
    private warehouseService: WarehouseService,
    private fournisseurService: FournisseursService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
   // this.initForm();
    if (!this.farm.warehouse) {
      this.farm.warehouse = {};
    }
    /*if (!this.farm.vendor) {
      this.farm.vendor = {};
    }
    this.getAllWarehouses();
    this.getAllVendors();
  }*/

  //initForm() {
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

      stage: new FormControl(""),
      status: new FormControl(""),
      grouwout: new FormControl(""),
      type: new FormControl(""),
      cost_Center: new FormControl(""),
      ferme_Type: new FormControl(""),
      status_Construction: new FormControl(""),
      num_Client: new FormControl(""),
      manager_Code: new FormControl(""),
      manager_name: new FormControl(""),
      technician_Code: new FormControl(""),
      technician_Name: new FormControl(""),
      area_type: new FormControl(""),
      owner_Name: new FormControl(""),
      attachments: new FormControl(""),
      address1: new FormControl(""),
      address2: new FormControl(""),
      customerCode: new FormControl(""),
      customerName: new FormControl(""),
      city_Code: new FormControl(""),
      city_Name: new FormControl(""),
      governorateCode: new FormControl(""),
      governorateName: new FormControl(""),
      zip_Code: new FormControl(""),
      email: new FormControl(""),
      deleted: new FormControl(""),
      phoneNumber: new FormControl(""),
      faxNumber: new FormControl(""),
      farm_Area: new FormControl(""),
      latitude: new FormControl(""),
      longitude: new FormControl(""),
    });
    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
  }

  geValues(event) {
    console.log("aaaa", this.addform);

    if (
      this.addform.value.code != null &&
      this.addform.value.code != "" &&
      this.addform.value.name != null &&
      this.addform.value.name != "" &&
      this.addform.value.owner_Name != null &&
      this.addform.value.owner_Name != "" &&
      this.addform.value.manager_Code != null &&
      this.addform.value.manager_Code != "" &&
      this.addform.value.manager_name != null &&
      this.addform.value.manager_name != "" &&
      this.addform.value.technician_Code != null &&
      this.addform.value.technician_Code != "" &&
      this.addform.value.technician_Name != null &&
      this.addform.value.technician_Name != "" &&
      this.addform.value.code.toString().length >= 5 &&
      this.addform.value.name.toString().length >= 3 &&
      this.addform.value.owner_Name.toString().length >= 3 &&
      this.addform.value.manager_Code.toString().length >= 5 &&
      this.addform.value.manager_name.toString().length >= 3 &&
      this.addform.value.technician_Code.toString().length >= 5 &&
      this.addform.value.technician_Name.toString().length >= 3
    ) {
      this.sharedService.setIsActive(true);
      console.log("bbbb", this.sharedService.setIsActive(true));
    } else {
      this.sharedService.setIsActive(false);
      console.log("cccc", this.sharedService.setIsActive(false));
    }
  }

  onWarehouseChange() {
    this.farm.warehouse = this.warehouses.find(
      (elem) => elem.id === this.farm.warehouse?.id
    );
  }

  getAllWarehouses() {
    this.warehouseService.findAll().subscribe({
      next: (result) => (this.warehouses = result),
      error: (error) => console.error(error),
    });
  }

  onVendorChange() {
    this.farm.vendor = this.vendors.find(
      (elem) => elem.id === this.farm.vendor?.id
    );
  }

  getAllVendors() {
    this.fournisseurService.findAll().subscribe({
      next: (result) => (this.vendors = result),
      error: (error) => console.error(error),
    });
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
  STisvali: boolean = false;
  Misvalid: boolean = false;
  valid: boolean = false;
  valid3: boolean = false;
  valid4: boolean = false;
  valid5: boolean = false;

  isBlurDCisvalid() {
    if (this.farm.code.toString().length < 5) {
      this.DCisvalid = true;
    } else {
      this.DCisvalid = false;
    }
  }

  nameISvalid: boolean = false;
  nameBlur() {
    if (this.addform.value.name.toString().length < 3) {
      this.nameISvalid = true;
    } else {
      this.nameISvalid = false;
    }
  }

  codeISvalid: boolean = false;
  codeBlur() {
    if (this.addform.value.code.toString().length < 3) {
      this.codeISvalid = true;
    } else {
      this.codeISvalid = false;
    }
  }

  owner_NameISvalid: boolean = false;
  owner_NameBlur() {
    if (this.addform.value.owner_Name.toString().length < 3) {
      this.owner_NameISvalid = true;
    } else {
      this.owner_NameISvalid = false;
    }
  }

  manager_CodeISvalid: boolean = false;
  manager_CodeBlur() {
    if (this.addform.value.manager_Code.toString().length < 3) {
      this.manager_CodeISvalid = true;
    } else {
      this.manager_CodeISvalid = false;
    }
  }

  manager_nameISvalid: boolean = false;
  manager_nameBlur() {
    if (this.addform.value.manager_name.toString().length < 3) {
      this.manager_nameISvalid = true;
    } else {
      this.manager_nameISvalid = false;
    }
  }

  technician_CodeISvalid: boolean = false;
  technician_CodeBlur() {
    if (this.addform.value.technician_Code.toString().length < 3) {
      this.technician_CodeISvalid = true;
    } else {
      this.technician_CodeISvalid = false;
    }
  }

  technician_NameISvalid: boolean = false;
  technician_NameBlur() {
    if (this.addform.value.technician_Name.toString().length < 3) {
      this.technician_NameISvalid = true;
    } else {
      this.technician_NameISvalid = false;
    }
  }

  isBlurSTisvali() {
    if (this.farm.owner_Name.toString().length < 3) {
      this.STisvali = true;
    } else {
      this.STisvali = false;
    }
  }

  isBlurMisvalid() {
    if (this.farm.manager_Code.toString().length < 3) {
      this.Misvalid = true;
    } else {
      this.Misvalid = false;
    }
  }

  isBlurvalid() {
    if (this.farm.manager_name.toString().length < 3) {
      this.valid4 = true;
    } else {
      this.valid4 = false;
    }
  }

  isBlurval() {
    if (this.farm.manager_Code.toString().length < 3) {
      this.valid3 = true;
    } else {
      this.valid3 = false;
    }
  }

  isBlurvalidat() {
    if (this.farm.technician_Code.toString().length < 3) {
      this.Misvalid = true;
    } else {
      this.Misvalid = false;
    }
  }

  isBlurva() {
    if (this.farm.technician_Name.toString().length < 3) {
      this.valid5 = true;
    } else {
      this.valid5 = false;
    }
  }
}
