import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AnimalProductRoutingModule } from "./animal-product-routing.module";
import { AnimalListComponent } from "./animal-list/animal-list.component";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  declarations: [AnimalListComponent],
  imports: [CommonModule, AnimalProductRoutingModule, SharedModule],
})
export class AnimalProductModule {}
