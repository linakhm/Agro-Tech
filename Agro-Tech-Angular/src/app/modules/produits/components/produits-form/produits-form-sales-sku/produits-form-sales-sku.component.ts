import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Produit } from '../../../models/produit.model';

@Component({
    selector: 'app-produits-form-sales-sku',
    templateUrl: './produits-form-sales-sku.component.html',
    styleUrls: ['./produits-form-sales-sku.component.scss']
})
export class ProduitsFormSalesSkuComponent implements OnInit {
    @Input() produit: Produit ;

    addprodform: FormGroup; // Main form's FormGroup to hold all the fields

    constructor() { }

    ngOnInit(): void {
        if (!this.produit.salesSKU) {
            this.produit.salesSKU = {}; // You can initialize it with default values if needed
        }
    }


    emitDataToMainForm() {
        if (this.addprodform.valid) {
            this.addprodform.patchValue({
                sales: this.addprodform.get('sales').value,
                code: this.addprodform.get('code').value,
                name: this.addprodform.get('name').value,

                // Add more properties for other sub-forms if needed
            });
        }
    }


}