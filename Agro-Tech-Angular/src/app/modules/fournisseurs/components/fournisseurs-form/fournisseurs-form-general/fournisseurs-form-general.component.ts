
import { Component, OnInit, Input, Output,EventEmitter } from "@angular/core";
import { Fournisseur } from "../../../models/fournisseur.model";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { Router } from "@angular/router";
import { badwordValidator } from "../../../models/badWordValidator";
const badWords = Fournisseur.BAD_WORDS;

@Component({
  selector: "app-fournisseurs-form-general",
  templateUrl: "./fournisseurs-form-general.component.html",
  styleUrls: ["./fournisseurs-form-general.component.scss"],
})
export class FournisseursFormGeneralComponent implements OnInit {
  @Input() fournisseur!: Fournisseur;
 
  @Input() formGroup: FormGroup; // Input to receive the form group from the parent component


  constructor(private sharedService: SharedService, private router: Router, private formBuilder: FormBuilder) { }
    addform: FormGroup; // Main form's FormGroup to hold all the fields

    ngOnInit(): void {
        console.log('ngOnInit  before init form :', this.fournisseur);


        this.initForm();

    }

    initForm() {
    this.addform = this.formBuilder.group({
    code: ["", [Validators.required, badwordValidator(badWords), Validators.minLength(4), Validators.maxLength(8)]],
    name: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    type: ["", [Validators.required]],
    paymentTerm: ["", [Validators.required]],
    currencyCode: ["", [Validators.required]],
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

      const vendorData = this.addform.value as Fournisseur;
      if (this.addform.valid) {

      this.sharedService.setIsActive(true);
      } else {
          // Bad word detected 
          // For example, set a flag to indicate that a bad word is present
          this.sharedService.setIsActive(false);
      }
  }

  get f() {
    return this.addform.controls;
    }
    emitDataToMainForm() {
        if (this.addform.valid) {
            this.formGroup.patchValue({
                code: this.addform.get('code').value,
                name: this.addform.get('name').value,
                type: this.addform.get('type').value,
                currencyCode: this.addform.get('currencyCode').value,
                paymentTerm: this.addform.get('paymentTerm').value,
                // Add more properties for other sub-forms if needed
            });
        }
    }

  // isControlValid(controlCode: string): boolean {
  //   const control = this.addform.controls[controlCode];
  //   return control.invalid && (control.dirty || control.touched);
  // }

  // isControlInValid(controlName: string): boolean {
  //   const control = this.addform.controls[controlName];
  //   return control.invalid && (control.dirty || control.touched);
  // }



    }




