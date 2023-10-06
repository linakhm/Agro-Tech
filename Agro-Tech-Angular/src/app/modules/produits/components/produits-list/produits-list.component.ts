import { Component, OnInit, ViewChild, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { initPage, Page } from "app/shared/models";
import { FilesService } from "app/shared/services/files/files.service";
import { Produit } from "../../models/produit.model";
import { ProduitsService } from "../../services/produits.service";
import { HotToastService } from "@ngneat/hot-toast";

@Component({
  selector: "app-produits-list",
  templateUrl: "./produits-list.component.html",
  styleUrls: ["./produits-list.component.scss"],
})
export class ProduitsListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;

  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;

  @ViewChild("importModal")
  importModal!: DialogComponent;

//    @ViewChild("formAddVendor")
//   formAddVendor!: NgForm;
  @ViewChild("stepper")
  stepper!: StepperComponent;

  currentStep = 0;
  steps: any = [
    "steps.productGroup",
    "steps.productUsage",
    "steps.vendorSKU",
    "steps.salesSKU",
  ];

  loading = false;
  produits: Array<Produit> = [];
  produit: Produit = {};
  produitsPage: Page<Produit> = initPage;
  pageNumber = 0;
  pageSize = 3;
  filter = "";
    onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
    searchTaxRate!: number;
    searchCategory!: string;

  file: File | null = null;

  constructor(
    private produitsService: ProduitsService,
    private filesService: FilesService,
    private translateService: TranslateService,
    private toastService: HotToastService
  ) {}

    ngOnInit(): void {
       // this.findArchivedProducts();
        //this.onPaginationChange.subscribe(() => this.findArchivedProducts());
        this.findPage();
        this.onPaginationChange.subscribe(() => this.findPage());
  }

  findPage() {
    this.loading = true;
    this.produitsService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.produits = result.content;
          this.produitsPage = result;
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

  onCancel() {
    this.produit = {
      //fournisseur: {},
    };
    this.currentStep = 0;
    }


    findArchivedProducts() {
        console.log("calling archiiiiiiiiiveee");
        this.produitsService
            .findArchivedProducts(this.pageNumber, this.pageSize,this.filter)
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
    this.produitsService.importCSV(formData).subscribe({
      next: () => {
        this.importModal.hide();
        this.findPage();
        this.file = null;
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("Product imported successfully ! ", {
            elem: this.translateService.instant("menu.products"),
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
      title: "menu.import-products",
      btnLabel: "btns.import",
      confirm: () => this.onCSVImport(),
      cancel: () => (this.file = null),
    });
  }
    onSaveAdd(id: string | null) {
        console.log("onSaveAdd called000000000000000");

        this.toastService.loading(
            this.translateService.instant("message.loading..."),
            { id: "0" }
        );
     

        this.produitsService.create(this.produit!).subscribe({
            next: () => {
                this.findPage();
                this.formModal.hide();
                this.onCancel();
                this.toastService.close("0");
                console.log("5555555555555555 call add product",this.produit);
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
    onSaveUpdate(id: string) {

        this.toastService.loading(
            this.translateService.instant("message.loading..."),
            { id: "0" }
        );

        console.log("Calling onSaveUpdate vendooor:", this.produit);

        this.produitsService.update(id, this.produit!).subscribe({
            next: () => {
                console.log("Updated successfully !"); // Check if this log is printed
                this.findPage();
                this.formModal.hide();
                this.onCancel();
                this.toastService.close("0");
                this.toastService.success(
                    this.translateService.instant("Updated successfully !", {
                        elem: this.translateService.instant("product"),
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
                        elem: this.translateService.instant("product"),
                    })
                );
            },

        });
    }

    onWizardSaveAddForm(id: string | null) {
        console.log("onWizardSaveAddForm called");
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

    /*
    onConfirm() {
        // Call the onSubmit method of the form to handle form submission
        this.formAddVendor.onSubmit(null);
    }
    */

    onClickAddForm() {
        this.formModal.show({
            title: "menu.add-produit",
            stepsCount: this.steps.length - 1,
            confirm: () => this.onWizardSaveAddForm(null),
            cancel: () => this.onCancel(),
            prev: () => this.stepper.prevStep(),
        });
    }

    onClickEditForm(id: string) {
        this.produitsService.findById(id).subscribe(
            (result) => {
                this.produit = result;
                this.formModal.show({
                    title: "menu.edit-produit",
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
      this.produitsService.delete(id).subscribe({
        next: () => {
          this.findPage();
          this.deleteModal.hide();
          this.toastService.close("0");
          this.onFilterChange("");
          this.toastService.success(
            this.translateService.instant("Product deleted successfully ! ", {
              elem: this.translateService.instant("product"),
            })
          );
        },
        error: (error) => {
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("product"),
            })
          );
        },
      });
    });
  }

    onClickArchive(id: string) {
        this.deleteModal.show(() => {
            this.produitsService.archive(id).subscribe({
                next: () => {
                    this.deleteModal.hide();
                    this.toastService.success('Product archived successfully');
                    // Remove the archived product from the initial list
                    this.produits = this.produits.filter(p => p.id !== id);
                },
                error: (error) => {
                    console.error(error);
                    // Handle error
                },
            });
        });
    }





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

    onCSVChange(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (!fileList) {
            return;
        }
        this.file = fileList[0];
    }



    searchProducts(): void {
        this.produitsService.searchProds(this.searchTaxRate, this.searchCategory)
            .subscribe((produits: Produit[]) => {
                this.produits = produits;
            });
    }

   

  

}
