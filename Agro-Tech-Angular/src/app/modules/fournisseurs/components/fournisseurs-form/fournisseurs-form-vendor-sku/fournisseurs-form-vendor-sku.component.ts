import { Component, OnInit, Input } from '@angular/core';
import { Fournisseur } from '../../../models/fournisseur.model';

@Component({
  selector: 'app-fournisseurs-form-vendor-sku',
  templateUrl: './fournisseurs-form-vendor-sku.component.html',
  styleUrls: ['./fournisseurs-form-vendor-sku.component.scss']
})
export class FournisseursFormVendorSkuComponent implements OnInit {
  @Input() fournisseur!: Fournisseur

  constructor() { }

  ngOnInit(): void {
   // if(!this.fournisseur){
   //   this.fournisseur.vendorSKU = {}
    }
  }


