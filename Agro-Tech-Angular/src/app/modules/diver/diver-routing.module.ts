import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DiverListComponent } from "./diver-list/diver-list.component";

const routes: Routes = [
  {
    path: "",
    component: DiverListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiverRoutingModule {}
