import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DivisionRoutingModule } from "./division-routing.module";
import { DivisionFormComponent } from "./components/division-form/division-form.component";
import { DivisionListComponent } from "./components/division-list/division-list.component";
import { DivisionFormGeneralComponent } from "./components/division-form/division-form-general/division-form-general.component";
import { DivisionFromLocalisationComponent } from "./components/division-form/division-from-localisation/division-from-localisation.component";
import { DivisionFormCompanyComponent } from "./components/division-form/division-form-company/division-form-company.component";
import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";
import { TrashDComponent } from "./trash/trashD.component";

@NgModule({
  declarations: [
    DivisionFormComponent,
    DivisionListComponent,
    DivisionFormGeneralComponent,
    DivisionFromLocalisationComponent,
    DivisionFormCompanyComponent,
    TrashDComponent,
  ],
  imports: [CommonModule, DivisionRoutingModule, SharedModule],
  providers: [SharedService],
})
export class DivisionModule {}
