import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Produit } from '../../../models/produit.model';

@Component({
    selector: 'app-produits-form-usage',
    templateUrl: './produits-form-usage.component.html',
    styleUrls: ['./produits-form-usage.component.scss']
})
export class ProduitsFormUsageComponent implements OnInit {
    addprodform: FormGroup; // Main form's FormGroup to hold all the fields
    @Input() produit: Produit;

    constructor() { }

    ngOnInit(): void {

        if (!this.produit.productusage) {
            this.produit.productusage = {}; // You can initialize it with default values if needed
        }



    }


    emitDataToMainForm() {
        if (this.addprodform.valid) {
            this.addprodform.patchValue({
                transactionDate: this.addprodform.get('transactionDate').value,

                houseCode: this.addprodform.get('houseCode').value,
                farmCode: this.addprodform.get('farmCode').value,

            });
        }
    }

}



