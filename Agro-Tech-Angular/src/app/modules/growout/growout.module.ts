import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";
import { GrowoutFormGeneralComponent } from "./component/growout-form/growout-form-general/growout-form-general.component";
import { GrowoutFormLocationComponent } from "./component/growout-form/growout-form-location/growout-form-location.component";
import { GrowoutFormComponent } from "./component/growout-form/growout-form.component";
import { GrowoutListComponent } from "./component/growout-list/growout-list.component";
import { GrowoutRoutingModule } from "./growout-routing.module";
import { TrashGComponent } from "./trash/trashG.component";


@NgModule({
  declarations: [
    GrowoutFormComponent,
    GrowoutListComponent,
    GrowoutFormLocationComponent,
    GrowoutFormGeneralComponent,
    TrashGComponent,
  ],
  imports: [CommonModule, GrowoutRoutingModule, SharedModule],
  providers: [SharedService],
})
export class GrowoutModule {}
