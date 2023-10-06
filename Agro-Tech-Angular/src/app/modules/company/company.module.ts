import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CompanyRoutingModule } from "./company-routing.module";
import { SharedModule } from "app/shared/shared.module";
import { CampanyFromComponent } from "./components/campany-from/campany-from.component";
import { CampanyListComponent } from "./components/campany-list/campany-list.component";
import { CompanyFromGeneralComponent } from "./components/campany-from/company-from-general/company-from-general.component";
import { CompanyFromLocalisationComponent } from "./components/campany-from/company-from-localisation/company-from-localisation.component";
import { SharedService } from "./services/shared.service";
import { TrashCComponent } from "./trash/trashC.component";

@NgModule({
  declarations: [
    CampanyFromComponent,
    CampanyListComponent,
    CompanyFromGeneralComponent,
    CompanyFromLocalisationComponent,
    TrashCComponent,
  ],
  imports: [CommonModule, CompanyRoutingModule, SharedModule],
  providers: [SharedService],
})
export class CompanyModule {}
