import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../../company/services/shared.service';
import { Fournisseur } from '../../../models/fournisseur.model';

@Component({
  selector: 'app-fournisseurs-form-shipping',
  templateUrl: './fournisseurs-form-shipping.component.html',
  styleUrls: ['./fournisseurs-form-shipping.component.scss']
})
export class FournisseursFormShippingComponent implements OnInit {
    @Input() fournisseur!: Fournisseur
    /**jdid */  @Input() formGroup: FormGroup; // Input to receive the form group from the parent component

  //addform: FormGroup; // Main form's FormGroup to hold all the fields
  /*constructor() { }

  ngOnInit(): void {
  }*/
    constructor(private sharedService: SharedService, private router: Router, private formBuilder: FormBuilder) { }
    addform: FormGroup; // Main form's FormGroup to hold all the fields

    ngOnInit(): void {
        this.initForm();
    }

    /**new */


    initForm() {
        this.addform = this.formBuilder.group({
            shippingAddress: ["", [Validators.required]],
            shippingCity: ["", [Validators.required]],
            
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

            this.sharedService.setIsActive(false);
        }
    }

    get f() {
        return this.addform.controls;
    }
    /***/ 

    emitDataToMainForm() {
        if (this.addform.valid) {
            this.addform.patchValue({
                shippingAddress: this.addform.get('shippingAddress').value,
                shippingCity: this.addform.get('shippingCity').value,
              
                // Add more properties for other sub-forms if needed
            });
        }
    }
}
