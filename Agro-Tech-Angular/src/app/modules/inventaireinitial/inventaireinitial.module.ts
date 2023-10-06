import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventaireinitialRoutingModule } from './inventaireinitial-routing.module';
import { SharedModule } from "app/shared/shared.module";
import { SharedService } from '../company/services/shared.service';
import { BeginninginventoryListComponent } from './components/beginninginventory-list/beginninginventory-list.component';
import { BeginninginventoryAddComponent } from './components/beginninginventory-add/beginninginventory-add.component';
import { BeginninginventoryDetailsComponent } from './components/beginninginventory-add/beginninginventory-details/beginninginventory-details.component';
import { BeginninginventoryTransactionsComponent } from './components/beginninginventory-add/beginninginventory-transactions/beginninginventory-transactions.component';
import { BeginninginventoryProductsComponent } from './components/beginninginventory-add/beginninginventory-products/beginninginventory-products.component';
import { TrashComponentB } from './trash/trash.component';
@NgModule({
    declarations: [
        BeginninginventoryListComponent,
        BeginninginventoryAddComponent,
 
        BeginninginventoryDetailsComponent,
        BeginninginventoryProductsComponent,
        BeginninginventoryTransactionsComponent,

        TrashComponentB
    ],
    imports: [
        CommonModule,
        InventaireinitialRoutingModule, SharedModule,


    ],
    providers: [SharedService]
})
export class InventaireinitialModule { }
