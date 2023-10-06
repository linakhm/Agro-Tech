import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitsRoutingModule } from './produits-routing.module';
import { ProduitsListComponent } from './components/produits-list/produits-list.component';
import { ProduitsFormComponent } from './components/produits-form/produits-form.component';
import { ProduitsFormGroupComponent } from './components/produits-form/produits-form-group/produits-form-group.component';
import { ProduitsFormUsageComponent } from './components/produits-form/produits-form-usage/produits-form-usage.component';
import { ProduitsFormVendorSkuComponent } from './components/produits-form/produits-form-vendor-sku/produits-form-vendor-sku.component';
import { ProduitsFormSalesSkuComponent } from './components/produits-form/produits-form-sales-sku/produits-form-sales-sku.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    ProduitsListComponent,
    ProduitsFormComponent,
    ProduitsFormGroupComponent,
    ProduitsFormUsageComponent,
    ProduitsFormVendorSkuComponent,
    ProduitsFormSalesSkuComponent
  ],
  imports: [
    CommonModule,
    ProduitsRoutingModule,
    SharedModule
  ]
})
export class ProduitsModule { }
