import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmsListComponent } from './components/farms-list/farms-list.component';

const routes: Routes = [
  { path: '', component: FarmsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmsRoutingModule { }
