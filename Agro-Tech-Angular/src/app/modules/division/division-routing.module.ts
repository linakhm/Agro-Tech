import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivisionListComponent } from './components/division-list/division-list.component';

const routes: Routes = [{ path: '', component: DivisionListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivisionRoutingModule { }
