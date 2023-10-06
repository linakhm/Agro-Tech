import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FournisseursListComponent } from './components/fournisseurs-list/fournisseurs-list.component';

const routes: Routes = [
  {
    path: 'listVendors',
    component: FournisseursListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseursRoutingModule { }
