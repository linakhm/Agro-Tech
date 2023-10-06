import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DiverRoutingModule } from "./diver-routing.module";
import { DiverListComponent } from "./diver-list/diver-list.component";
import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";

@NgModule({
  declarations: [DiverListComponent],
  imports: [CommonModule, DiverRoutingModule, SharedModule],
})
export class DiverModule {}
