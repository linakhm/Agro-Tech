import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../company/services/shared.service';
import { Externaltransfer } from '../../../models/externaltransfer.model';
import { ExternaltransfersService } from '../../../services/externaltransfers.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-transfers-general',
  templateUrl: './transfers-general.component.html',
    styleUrls: ['./transfers-general.component.scss']
})
export class TransfersGeneralComponent implements OnInit {
    @Input() externaltransfer: Externaltransfer;
    @Input() formGroup: FormGroup; // Input to receive the form group from the parent component

    addinventoryform: FormGroup; // Main form's FormGroup to hold all the fields

    constructor(
        private router: Router, private formBuilder: FormBuilder,
        private externaltransferService: ExternaltransfersService,
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
        this.addinventoryform = this.formBuilder.group({
            transactionDate: ["", [Validators.required]],
            warehouseCode: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
          

        });
        console.log("====================================");
        console.log(" add inventory form :", this.addinventoryform);
        console.log("====================================");


    }
    geValues(event) {
        console.log("====================================");
        console.log("event :", event);
        console.log("====================================");

        console.log("====================================");
        console.log("le formulaire :", this.addinventoryform);
        console.log("====================================");

        const inventoryData = this.addinventoryform.value as Externaltransfer;
        console.log("the inventory  :", inventoryData);

        this.sharedService.setIsActive(true);

        this.sharedService.setIsActive(true);
    }




    get f() {
        return this.addinventoryform.controls;
    }
    emitDataToMainForm() {
        console.log("emit ***");

        if (this.addinventoryform.valid) {
            this.formGroup.patchValue({
                transactionDate: this.addinventoryform.get('transactionDate').value,
                warehouseCode: this.addinventoryform.get('warehouseCode').value,
               

            });

        }

    }


}
