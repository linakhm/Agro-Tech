import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CampanyListComponent } from "./components/campany-list/campany-list.component";
import { CampanyFromComponent } from "./components/campany-from/campany-from.component";
import { TrashCComponent } from "./trash/trashC.component";

const routes: Routes = [
  {
    path: "",
    component: CampanyListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
