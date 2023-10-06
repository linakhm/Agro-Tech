import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../../company/services/shared.service';
import { Fournisseur } from '../../../models/fournisseur.model';

@Component({
    selector: 'app-fournisseurs-form-information',
    templateUrl: './fournisseurs-form-information.component.html',
    styleUrls: ['./fournisseurs-form-information.component.scss']
})
export class FournisseursFormInformationComponent implements OnInit {

    @Input() fournisseur!: Fournisseur
    /** jdid */ @Input() formGroup: FormGroup;
   /**jdid*/constructor(private sharedService: SharedService, private router: Router, private formBuilder: FormBuilder) { }
    addform: FormGroup; // Main form's FormGroup to hold all the fields

   /** jdid */ ngOnInit(): void {

       this.initForm();

    }

        //    constructor() { }

        //  addform: FormGroup; // Main form's FormGroup to hold all the fields

        // ngOnInit(): void {
        // }



       initForm() {
           this.addform = this.formBuilder.group({
               // code: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
               address: ["", [Validators.required]],
               codeCity: ["", [Validators.required]],
               nameCity: ["", [Validators.required]],

               wilayaName: ["", [Validators.required]],
               phone: ["", [Validators.required, Validators.pattern('^[0-9]+$')]],
               email: ["", [Validators.required ,Validators.email]],

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


        emitDataToMainForm() {
            if (this.addform.valid) {
                this.addform.patchValue({
                    address: this.addform.get('address').value,
                    codeCity: this.addform.get('codeCity').value,
                    nameCity: this.addform.get('nameCity').value,
                    wilayaName: this.addform.get('wilayaName').value,
                    phone: this.addform.get('phone').value,
                    email: this.addform.get('email').value,

                    // Add more properties for other sub-forms if needed
                });
            }
        }
    }


