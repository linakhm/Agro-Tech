import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EggProductListComponent } from "./egg-product-list/egg-product-list.component";

const routes: Routes = [{ path: "", component: EggProductListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EggProductRoutingModule {}
