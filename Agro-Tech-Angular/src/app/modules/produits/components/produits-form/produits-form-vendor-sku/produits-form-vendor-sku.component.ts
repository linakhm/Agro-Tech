import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Produit } from '../../../models/produit.model';

@Component({
  selector: 'app-produits-form-vendor-sku',
  templateUrl: './produits-form-vendor-sku.component.html',
  styleUrls: ['./produits-form-vendor-sku.component.scss']
})
export class ProduitsFormVendorSkuComponent implements OnInit {
    addprodform: FormGroup; // Main form's FormGroup to hold all the fields
    @Input() produit: Produit;

  constructor() { }

    ngOnInit(): void {

        if (!this.produit.vendorSKU) {
            this.produit.vendorSKU = {}; // You can initialize it with default values if needed
        }
    
    }
    emitDataToMainForm() {
        if (this.addprodform.valid) {
            this.addprodform.patchValue({
                code: this.addprodform.get('code').value,
                name: this.addprodform.get('name').value,

            });
        }
    }

}
