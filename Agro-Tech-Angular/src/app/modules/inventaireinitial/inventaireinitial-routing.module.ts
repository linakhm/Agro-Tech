import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeginninginventoryListComponent } from './components/beginninginventory-list/beginninginventory-list.component';

    const routes: Routes = [


        {
            path: '',
            component: BeginninginventoryListComponent
        }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventaireinitialRoutingModule { }
