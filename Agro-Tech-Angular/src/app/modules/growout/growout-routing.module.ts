import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrowoutListComponent } from './component/growout-list/growout-list.component';

const routes: Routes = [
  {
    path: '',
    component: GrowoutListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrowoutRoutingModule { }
