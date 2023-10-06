import { Component, OnInit, ViewChild, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { initPage, Page } from "app/shared/models";
import { FilesService } from "app/shared/services/files/files.service";
import { BeginningInventory } from "../../models/beginninginventory.model";
import { BeginninginventoryService } from "../../services/beginninginventory.service";
import { BeginninginventoryDetailsComponent } from "../beginninginventory-add/beginninginventory-details/beginninginventory-details.component";
import { BeginninginventoryProductsComponent } from "../beginninginventory-add/beginninginventory-products/beginninginventory-products.component";
import { BeginninginventoryTransactionsComponent } from "../beginninginventory-add/beginninginventory-transactions/beginninginventory-transactions.component";
@Component({
  selector: 'app-beginninginventory-list',
  templateUrl: './beginninginventory-list.component.html',
  styleUrls: ['./beginninginventory-list.component.scss']
})
export class BeginninginventoryListComponent implements OnInit {
    @ViewChild(BeginninginventoryDetailsComponent)
    beginninginventoryDetailsComponent: BeginninginventoryDetailsComponent;

    @ViewChild(BeginninginventoryTransactionsComponent)
    beginninginventoryTransactionsComponent: BeginninginventoryTransactionsComponent;

    @ViewChild(BeginninginventoryProductsComponent)
    beginninginventoryProductsComponent: BeginninginventoryProductsComponent;

    @ViewChild("deleteModal")
    deleteModal!: ConfirmDialogComponent;

    @ViewChild("archiveModal")
    archiveModal!: ConfirmDialogComponent;

    @ViewChild("formModal")
    formModal!: WizardDialogComponent;

    @ViewChild("importModal")
    importModal!: DialogComponent;

 

   @ViewChild("stepper")
    stepper!: StepperComponent;

    currentStep = 0;
    steps: any = [
        "steps.inventory",
        "steps.product",
        "steps.details"

    ];

    loading = false;
    inventories: Array<BeginningInventory> = [];
    beginninginventory: BeginningInventory = {
        isDeleted: false
    };
    inventoriesPage: Page<BeginningInventory> = initPage;
    pageSize = 5;
    pageNumber = 0;
    filter = "";
    onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
    searchPrixUnitaire!: number;
    searchNomProduit!: string;
    productType: string ;
    file: File | null = null;
    addinventoryform: FormGroup;

    constructor(
        private beginninginventoryService: BeginninginventoryService,
        private filesService: FilesService,
        private translateService: TranslateService,
        private toastService: HotToastService
    ) { }

    ngOnInit(): void {
        // this.findArchivedProducts();
        //this.onPaginationChange.subscribe(() => this.findArchivedProducts());
        this.findPage();
        this.onPaginationChange.subscribe(() => this.findPage());
    }

    findPage() {
        this.loading = true;
        this.beginninginventoryService
            .findPage(this.pageSize, this.pageNumber, this.filter)
            .subscribe({
                next: (result) => {
                    console.log("API Response Data:", result); // Add this line
                    this.inventories = result.content;
                    this.inventoriesPage = result;
                },
                error: (error) => {
                    this.loading = false;
                    console.error(error);
                },
                complete: () => (this.loading = false),
            });
    }


    findById(id: string) {
        this.beginninginventoryService.findById(id).subscribe({
            next: (result) => (this.beginninginventory = result),
            error: (error) => console.error(error),
        });
    }
    searchInventories(): void {
        this.beginninginventoryService.searchInventory(this.searchPrixUnitaire, this.searchNomProduit)
            .subscribe((inventories: BeginningInventory[]) => {
                this.inventories = inventories;
            });
    }

  /*  findByName() {
        this.beginninginventoryService.findByName(this.name).subscribe({
            next: (result) => {
                if (result) {
                    this.inventories = [result];
                } else {
                    this.inventories = [];
                }
            },
            error: (error) => console.error(error),
        });
    }
    clearSearchName() {
        this.name = ''; // Clear search query
        this.findPage(); 
    }




    findByCode() {
        this.beginninginventoryService.findByCode(this.code).subscribe({
            next: (result) => {
                if (result) {
                    this.inventories = [result];
                } else {
                    this.inventories = [];
                }
            },
            error: (error) => console.error(error),
        });
    }
    clearSearchCode() {
        this.code = ''; 
        this.findPage(); 
    }
    findByProductType() {
        this.beginninginventoryService.findByProductType(this.productType).subscribe({
            next: (codes) => {
                this.inventories = this.inventories.filter(inventory =>
                    codes.includes(inventory.codeProduit) 
                );
            },
            error: (error) => console.error(error),
        });
    }

*/
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

    onCancel() {
        this.beginninginventory = {
            isDeleted: false
        };
        this.currentStep = 0;
    }
    findArchived() {
        console.log("calling archiiiiiiiiiveee");
        this.beginninginventoryService
            .findArchivedPage(this.pageSize, this.pageNumber, this.filter)
            .subscribe({
                next: (result) => {
                    this.inventories = result.content; 
                    this.inventoriesPage = result; 
                },
                error: (error) => {
                    this.loading = false;
                    console.error(error);
                },
                complete: () => (this.loading = false),
            });

    }


    /*
    
    */
    /*
      onSave(id: string | null) {
        this.toastService.loading(
          this.translateService.instant("message.loading..."),
          {
            id: "0",
          }
        );
        this.produitsService.save(id, this.produit!).subscribe({
          next: () => {
            this.findPage();
            this.formModal.hide();
            this.onCancel();
            this.toastService.close("0");
            this.toastService.success(
              this.translateService.instant("Product saved successfully ! ", {
                elem: this.translateService.instant("product"),
              })
            );
          },
          error: (error) => {
            this.toastService.close("0");
            this.toastService.error(
              this.translateService.instant(error.error, {
                elem: this.translateService.instant("product"),
              })
            );
          },
        });
      }
      */

    onCSVImport() {
        if (!this.file) {
            return;
        }
        this.toastService.loading(
            this.translateService.instant("message.loading..."),
            {
                id: "0",
            }
        );
        let formData: FormData = new FormData();
        formData.append("file", this.file);
        this.beginninginventoryService.importCSV(formData).subscribe({
            next: () => {
                this.importModal.hide();
                this.findPage();
                this.file = null;
                this.toastService.close("0");
                this.toastService.success(
                    this.translateService.instant("inventory imported successfully ! ", {
                        elem: this.translateService.instant("menu.inventories"),
                    })
                );
            },
            error: (error) => {
                this.toastService.close("0");
                this.toastService.error(this.translateService.instant(error.error));
            },
        });
    }

    openImportModal() {
        this.importModal.show({
            title: "menu.import-inventories",
            btnLabel: "btns.import",
            confirm: () => this.onCSVImport(),
            cancel: () => (this.file = null),
        });
    }

    onSaveAdd(id: string | null) {

        this.toastService.loading(
            this.translateService.instant("message.loading..."),
            { id: "0" }
        );


        this.beginninginventoryService.create(this.beginninginventory!).subscribe({
            next: () => {
                this.findPage();
                this.formModal.hide();
                this.onCancel();
                this.toastService.close("0");
                this.toastService.success(
                    this.translateService.instant("beginning inventory saved successfully ! ", {
                        elem: this.translateService.instant("transfer"),
                    })
                );
        
            },
            error: (error) => {
                this.toastService.close("0");
                this.toastService.error(
                    this.translateService.instant(error.error, {
                        elem: this.translateService.instant("transfer"),
                    })
                );
            },
        });
    }
    onSaveUpdate(id: string) {

        this.toastService.loading(
            this.translateService.instant("message.loading..."),
            { id: "0" }
        );

        console.log("Calling onSaveUpdate inventoy:", this.beginninginventory);

        this.beginninginventoryService.update(id, this.beginninginventory!).subscribe({
            next: () => {
                console.log("Updated successfully !"); // Check if this log is printed
                this.findPage();
                this.formModal.hide();
                this.onCancel();
                this.toastService.close("0");
                this.toastService.success(
                    this.translateService.instant("Updated successfully !", {
                        elem: this.translateService.instant("transfer"),
                    })
                );
            },
            error: (error) => {
                console.error("**********Update error:", error); // Check if this log is printed
                console.log("************Error response:", error.response); // Log the error response
                console.log("************Error status:", error.status); // Log the HTTP status code
                console.log("************Error message:", error.message); // Log the error message
                this.toastService.close("0");
                this.toastService.error(
                    this.translateService.instant(error.error, {
                        elem: this.translateService.instant("transfer"),
                    })
                );
            },

        });
    }
    /*
    onWizardSaveAddForm(id: string | null) {
        console.log("onWizardSaveAddForm called");

        if (this.stepper.lastStep()) {
            this.onSaveAdd(id);
            return;
        }
        this.stepper.nextStep();
    }*/
    onWizardSaveAddForm(id: string | null) {
        console.log('onWizardSaveAddForm called');

        if (this.stepper.lastStep()) {
            this.onSaveAdd(id);
            return;
        }
        this.stepper.nextStep();
    }

    onWizardSaveUpdateForm(id: string) {
        if (this.stepper.lastStep()) {
            this.onSaveUpdate(id);
            return;
        }
        this.stepper.nextStep();
    }
    onStepChange(step: number) {
        this.currentStep = step;
    }


    onClickAddForm() {
      
        this.formModal.show({
            title: "menu.add-beginninginventory",
            stepsCount: this.steps.length - 1,

            confirm: () => this.onWizardSaveAddForm(null),
            cancel: () => this.onCancel(),
            prev: () => this.stepper.prevStep(),
        });
    }

    onClickEditForm(id: string) {
        this.beginninginventoryService.findById(id).subscribe(
            (result) => {
                this.beginninginventory = result;
                this.formModal.show({
                    title: "menu.edit-beginninginventory",
                    stepsCount: this.steps.length - 1,
                    confirm: () => this.onWizardSaveUpdateForm(id),
                    cancel: () => this.onCancel(),
                    prev: () => this.stepper.prevStep(),
                });
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onClickDelete(id: string) {
        this.deleteModal.show(() => {
            this.toastService.loading(
                this.translateService.instant("message.loading..."),
                {
                    id: "0",
                }
            );
            this.beginninginventoryService.delete(id).subscribe({
                next: () => {
                    this.findPage();
                    this.deleteModal.hide();
                    this.toastService.close("0");
                    this.onFilterChange("");
                    this.toastService.success(
                        this.translateService.instant("beginning inventory deleted successfully ! ", {
                            elem: this.translateService.instant("beginning inventory"),
                        })
                    );
                },
                error: (error) => {
                    this.deleteModal.hide();
                    this.toastService.close("0");
                    this.toastService.error(
                        this.translateService.instant(error.error, {
                            elem: this.translateService.instant("beginning inventory"),
                        })
                    );
                },
            });
        });
    }
    onClickArchive(id: string) {
        this.deleteModal.show(() => {
            this.beginninginventoryService.archive(id).subscribe({
                next: () => {
                    this.deleteModal.hide();
                    this.toastService.success('Inventory archived successfully');
                    // Remove the archived product from the initial list
                    this.inventories = this.inventories.filter(p => p.id !== id);
                },
                error: (error) => {
                    console.error(error);
                    // Handle error
                },
            });
        });
    }
    /*

    





    onDownloadCSVTempalte() {

        this.produitsService.downloadCSVTemplate().subscribe({
            next: (data) =>
                this.filesService.download(
                    data,
                    this.translateService.instant("menu.products") + ".csv"
                ),
            error: (error) => console.error(error),
        });




    }




*/
 
    onCSVChange(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (!fileList) {
            return;
        }
        this.file = fileList[0];

    }

    onDownloadCSVTempalte() {

        this.beginninginventoryService.downloadCSVTemplate().subscribe({
            next: (data) =>
                this.filesService.download(
                    data,
                    this.translateService.instant("menu.inventories") + ".csv"
                ),
            error: (error) => console.error(error),
        });




    }
    onDownloadPDFTempalte() {

        this.beginninginventoryService.downloadPDFTemplate().subscribe({
            next: (data) =>
                this.filesService.download(
                    data,
                    this.translateService.instant("menu.inventories") + ".pdf"
                ),
            error: (error) => console.error(error),
        });




    }
}
