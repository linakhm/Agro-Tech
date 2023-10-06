import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";
import { TrashCComponent } from "./modules/company/trash/trashC.component";
import { CostTrashComponent } from "./modules/cost-center/trash/costtrash.component";
import { CurrTrashComponent } from "./modules/currency/trash/curtrash.component";
import { TrashDComponent } from "./modules/division/trash/trashD.component";
import { FarmsListComponent } from "./modules/farms/components/farms-list/farms-list.component";
import { FournisseursListComponent } from "./modules/fournisseurs/components/fournisseurs-list/fournisseurs-list.component";
import { GrowoutListComponent } from "./modules/growout/component/growout-list/growout-list.component";
import { ProduitsListComponent } from "./modules/produits/components/produits-list/produits-list.component";
import { TrashProduitComponent } from "./modules/produits/trash/trashproduit.component";
import { TrashWComponent } from "./modules/warehouse/trash/trashw.component";
import { TrashComponent } from "./shared/components/trash/trash.component";
import { StartPageComponent } from "./start-page/start-page.component";
import { ExternaltransfersComponent } from "./modules/externaltransfers/externaltransfers.component";
import { TransfersListComponent } from "./modules/externaltransfers/components/transfers-list/transfers-list.component";
import { TrashComponentF } from "./modules/fournisseurs/trash/trash.component";
import { TrashComponentB } from "./modules/inventaireinitial/trash/trash.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
  },

  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
  },
  {
    path: "home",
    component: StartPageComponent,
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      { path: "dashboard", component: HomeComponent },
      { path: "dashboard/products", component: DashboardComponent },
      { path: "start", component: StartPageComponent },
             {
        path: "produits", component:ProduitsListComponent /* ,
        loadChildren: () =>
          import("./modules/produits/produits.module").then(
            (m) => m.ProduitsModule
          ),*/
             //    , children: [{ path: "trash", component: TrashProduitComponent }]
      },

      {
          path: "fournisseurs",
          component: FournisseursListComponent
        /*loadChildren: () =>
          import("./modules/fournisseurs/fournisseurs.module").then(
            (m) => m.FournisseursModule
          ),*/
        },
        { path: "trash", component: TrashProduitComponent },
        { path: "transfers", component: TransfersListComponent },
        {
            path: "inventaires-initiaux",
            loadChildren: () =>
                import("./modules/inventaireinitial/inventaireinitial.module").then(
                    (m) => m.InventaireinitialModule
                ),
        },
        {
            path: "inventaires-initiaux-trash", component: TrashComponentB
        },
        {
            path: "vendors-trash", component: TrashComponentF
        }
            
    ],
    }
    
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
