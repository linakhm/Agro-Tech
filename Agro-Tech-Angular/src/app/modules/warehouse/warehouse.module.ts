import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WarehouseRoutingModule } from "./warehouse-routing.module";
import { WarehouseListComponent } from "./components/warehouse-list/warehouse-list.component";
import { WarehouseFormComponent } from "./components/warehouse-form/warehouse-form.component";
import { SharedModule } from "app/shared/shared.module";
import { WarehouseFormGeneralComponent } from "./components/warehouse-form/warehouse-form-general/warehouse-form-general.component";
import { WarehouseFormInformationComponent } from "./components/warehouse-form/warehouse-form-information/warehouse-form-information.component";
import { TrashWComponent } from "./trash/trashw.component";
import { SharedService } from "../company/services/shared.service";

@NgModule({
  declarations: [
    WarehouseListComponent,
    WarehouseFormComponent,
    WarehouseFormGeneralComponent,
    WarehouseFormInformationComponent,
    TrashWComponent,
  ],
  imports: [CommonModule, WarehouseRoutingModule, SharedModule],
  providers: [SharedService],
})
export class WarehouseModule {}
