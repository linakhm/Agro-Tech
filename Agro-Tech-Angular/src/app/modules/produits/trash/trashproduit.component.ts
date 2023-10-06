import { Component, EventEmitter, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { Page, initPage } from "app/shared/models";
import { Produit } from "../models/produit.model";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { ProduitsService } from "../services/produits.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-trash-produit",
  templateUrl: "./trashproduit.component.html",
  styleUrls: ["./trashproduit.component.scss"],
})
export class TrashProduitComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;

  @ViewChild("disarchiveModal")
  disarchiveModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;

  @ViewChild("stepper")
  stepper!: StepperComponent;

  loading? = false;
  pageNumber = 0;
  pageSize = 3;
  filter = "";

  produit: Produit = {};
  produits: Array<Produit> = [];
    produitsPage: Page<Produit> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
    Page: Page<Produit> = initPage;

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
      private produitsService: ProduitsService,
      private router: Router,
      private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
 
      this.findArchivedProducts();
      this.onPaginationChange.subscribe(() => this.findArchivedProducts());

      
  }

    goToProduitsList() {
    //    console.log("0000000000 navigated");
        this.router.navigate(['/produits']);
    }
    findPage() {
        this.loading = true;
        this.produitsService
            .findArchivedProducts(this.pageNumber, this.pageSize, this.filter)
            .subscribe({
                next: (result) => {

                    this.produits = result.content;
                    this.produitsPage = result;
                    this.cdRef.detectChanges();


                },
                error: (error) => {
                    this.loading = false;
                    console.error(error);
                },
                complete: () => (this.loading = false),

            });

    }
    /*

    findArchivedPage() {
        console.log("calling archiiiiiiiiiveee");
        this.produitService
            .findArchivedPage(this.pageNumber, this.pageSize)
            .subscribe({
                next: (result) => {
                    console.log("X Archived products fetched:", result);

                    this.produits = result.content; // Update this line
                                        this.produitsPage = result;

                },
                error: (error) => {
                    console.error(error);
                },
                complete: () => {
                    console.log("Archived products fetched successfully.");
                },
            });
    }*/
    /*
    findArchivedProducts() {
         this.loading = true;
        this.produitService
            .findArchivedProducts(this.pageNumber, this.pageSize)
             .subscribe({
                 next: (result) => {
                     this.produits = result.content;
                     this.produitsPage = result;
                     console.log("X Archived products fetched:", this.produits);
                     console.log("X Archived products fetched:", this.produitsPage);

                 },
                 error: (error) => {
                     this.loading = false;
                     console.error(error);
                 },
                 complete: () => (this.loading = false),
             });
 }*/



    
    findArchivedProducts() {
        console.log("calling archiiiiiiiiiveee");
        this.produitsService
            .findArchivedProducts(this.pageNumber, this.pageSize, this.filter)
            .subscribe({
                next: (result) => {
                    this.produits = result.content; // Update this line
                    this.produitsPage = result; // Assuming this is used for pagination information
                },
                error: (error) => {
                    this.loading = false;
                    console.error(error);
                },
                complete: () => (this.loading = false),
            });

    }


 



  findById(id: string) {
    this.produitsService.findById(id).subscribe({
      next: (result) => (this.produit = result),
      error: (error) => console.error(error),
    });
  }

  onFilterChange(filter: string) {
    this.filter = filter;
    this.pageNumber = 0;
    this.onPaginationChange.emit("");
  }

  onPageNumberChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.onPaginationChange.emit("");
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 0;
    this.onPaginationChange.emit("");
    }
    /*

  onClickdisArchive(id: string) {
    this.produitService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.desarchived", {
            elem: this.translateService.instant("warehouse"),
          })
        );
        console.log(id);
      },
    });
  }

  
  onClickDelete(id: string) {
    this.produitService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("warehouse"),
          })
        );
      },
    });
  }*/
}
