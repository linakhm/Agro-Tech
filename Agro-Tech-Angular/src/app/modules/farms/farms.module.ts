import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FarmsRoutingModule } from "./farms-routing.module";
import { FarmsListComponent } from "./components/farms-list/farms-list.component";
import { FarmsFormComponent } from "./components/farms-form/farms-form.component";
import { SharedModule } from "app/shared/shared.module";
import { FarmsFormGeneralComponent } from "./components/farms-form/farms-form-general/farms-form-general.component";
import { FarmsFormLocalisationComponent } from "./components/farms-form/farms-form-localisation/farms-form-localisation.component";
import { SharedService } from "../company/services/shared.service";

@NgModule({
  declarations: [
    FarmsListComponent,
    FarmsFormComponent,
    FarmsFormGeneralComponent,
    FarmsFormLocalisationComponent,
  ],
  imports: [CommonModule, FarmsRoutingModule, SharedModule],
  providers: [SharedService],
})
export class FarmsModule {}
