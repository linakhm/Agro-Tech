import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CostCenterRoutingModule } from "./cost-center-routing.module";
import { SharedModule } from "app/shared/shared.module";
import { CostCenterListComponent } from "./components/cost-center-list/cost-center-list.component";
import { CostCenterFormGeneralComponent } from "./components/cost-center-form/cost-center-form-general/cost-center-form-general.component";
import { CostCenterFormInformationComponent } from "./components/cost-center-form/cost-center-form-information/cost-center-form-information.component";
import { CostCenterFormComponent } from "./components/cost-center-form/cost-center-form.component";
import { SharedService } from "../company/services/shared.service";
import { CostTrashComponent } from "./trash/costtrash.component";

@NgModule({
  declarations: [
    CostCenterListComponent,
    CostCenterFormGeneralComponent,
    CostCenterFormInformationComponent,
    CostCenterFormComponent,
    CostTrashComponent,
  ],
  imports: [CommonModule, SharedModule, CostCenterRoutingModule],
  providers: [SharedService],
})
export class CostCenterModule {}
