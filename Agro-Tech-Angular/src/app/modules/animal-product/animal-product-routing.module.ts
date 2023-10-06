import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalListComponent } from "./animal-list/animal-list.component";

const routes: Routes = [
  {
    path: "",
    component: AnimalListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalProductRoutingModule {}
