import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FournisseursRoutingModule } from "./fournisseurs-routing.module";
import { FournisseursListComponent } from "./components/fournisseurs-list/fournisseurs-list.component";
import { FournisseursFormComponent } from "./components/fournisseurs-form/fournisseurs-form.component";
import { SharedModule } from "app/shared/shared.module";
import { FournisseursFormGeneralComponent } from "./components/fournisseurs-form/fournisseurs-form-general/fournisseurs-form-general.component";
import { FournisseursFormInformationComponent } from "./components/fournisseurs-form/fournisseurs-form-information/fournisseurs-form-information.component";
import { FournisseursFormVendorSkuComponent } from "./components/fournisseurs-form/fournisseurs-form-vendor-sku/fournisseurs-form-vendor-sku.component";
import { FournisseursFormShippingComponent } from "./components/fournisseurs-form/fournisseurs-form-shipping/fournisseurs-form-shipping.component";
import { SharedService } from "../company/services/shared.service";
import { TrashComponentF } from "./trash/trash.component";

@NgModule({
  declarations: [
    FournisseursListComponent,
    FournisseursFormComponent,
    FournisseursFormGeneralComponent,
    FournisseursFormInformationComponent,
    FournisseursFormVendorSkuComponent,
    FournisseursFormShippingComponent,
    TrashComponentF
  ],
  imports: [CommonModule, FournisseursRoutingModule, SharedModule],
  providers: [SharedService],
})
export class FournisseursModule {}
