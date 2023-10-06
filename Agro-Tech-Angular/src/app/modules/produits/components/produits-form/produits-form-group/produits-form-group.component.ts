import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "app/modules/company/services/shared.service";
import { Produit } from '../../../models/produit.model';
import { ProduitsService } from '../../../services/produits.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produits-form-group',
  templateUrl: './produits-form-group.component.html',
  styleUrls: ['./produits-form-group.component.scss']
})
export class ProduitsFormGroupComponent implements OnInit {
    @Input() produit: Produit;
    @Input() formGroup: FormGroup; // Input to receive the form group from the parent component

    addprodform: FormGroup; // Main form's FormGroup to hold all the fields

  constructor(
      private router: Router, private formBuilder: FormBuilder,
      private produitService: ProduitsService,
      private sharedService: SharedService
  ) { }


    ngOnInit(): void {
        this.initForm();
   // if(!this.produit.fournisseur){
     // this.produit.fournisseur = {}
      //}
      //this.getAllProducts()

  }
    initForm() {
        this.addprodform = this.formBuilder.group({
            code: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
            name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
            type: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
            status: ["", [Validators.required]],
            currency: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
            inventory: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
            medicated: ["", [Validators.required]],
            manufacturer: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
            color: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
            maxOver: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
            prixUnitaireHt: ["", [Validators.required, Validators.min(10.00)]],
            prixUnitaireTtc: ["", [Validators.required, Validators.min(10.00)]],
            taxRate: ["", [Validators.required, Validators.min(10.00)]],
            category: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],

         
        });
        console.log("====================================");
        console.log(" add product form :", this.addprodform);
        console.log("====================================");

     
    }
    geValues(event) {
        console.log("====================================");
        console.log("event :", event);
        console.log("====================================");

        console.log("====================================");
        console.log("le formulaire :", this.addprodform);
        console.log("====================================");

        const produitData = this.addprodform.value as Produit;
        console.log("le  peooooooooood :", produitData);

        this.sharedService.setIsActive(true);

        this.sharedService.setIsActive(true);
    }



   
    get f() {
        return this.addprodform.controls;
    }
    emitDataToMainForm() {
        console.log("emit ***");

        if (this.addprodform.valid) {
            this.formGroup.patchValue({
                code: this.addprodform.get('code').value,
                name: this.addprodform.get('name').value,
                type: this.addprodform.get('type').value,
                status: this.addprodform.get('status').value,
                currency: this.addprodform.get('currency').value,
                inventory: this.addprodform.get('inventory').value,
                medicated: this.addprodform.get('medicated').value,
                manufacturer: this.addprodform.get('manufacturer').value,
                color: this.addprodform.get('color').value,
                maxOver: this.addprodform.get('maxOver').value,
                prixUnitaireHt: this.addprodform.get('prixUnitaireHt').value,
                prixUnitaireTtc: this.addprodform.get('prixUnitaireTtc').value,
                taxRate: this.addprodform.get('taxRate').value,
                category: this.addprodform.get('category').value,

            });

        }

    }



 /* onVendorChange(){
    if(this.produit.fournisseur!.id){
      this.produit.fournisseur = this.vendors.find(elem => elem.id === this.produit.fournisseur!.id)
    }
  }*/
 
}