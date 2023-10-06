import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EggProductRoutingModule } from "./egg-product-routing.module";
import { EggProductListComponent } from "./egg-product-list/egg-product-list.component";
import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";

@NgModule({
  declarations: [EggProductListComponent],
  imports: [CommonModule, EggProductRoutingModule, SharedModule],
  providers: [SharedService],
})
export class EggProductModule {}
