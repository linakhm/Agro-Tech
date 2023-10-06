import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostCenterListComponent } from './components/cost-center-list/cost-center-list.component';

const routes: Routes = [
  {
    path: '',
    component: CostCenterListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostCenterRoutingModule { }
