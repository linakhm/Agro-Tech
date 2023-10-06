import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CurrencyRoutingModule } from "./currency-routing.module";
import { CurrencyFormComponent } from "./components/currency-form/currency-form.component";
import { CurrencyFormGeneralComponent } from "./components/currency-form/currency-form-general/currency-form-general.component";
import { CurrencyListComponent } from "./components/currency-list/currency-list.component";
import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";
import { CurrTrashComponent } from "./trash/curtrash.component";

@NgModule({
  declarations: [
    CurrencyFormComponent,
    CurrencyFormGeneralComponent,
    CurrencyListComponent,
    CurrTrashComponent,
  ],
  imports: [CommonModule, CurrencyRoutingModule, SharedModule],
  providers: [SharedService],
})
export class CurrencyModule {}
