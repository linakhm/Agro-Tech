import { Component, OnInit, ViewChild, EventEmitter } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { initPage, Page } from "app/shared/models";
import { FilesService } from "app/shared/services/files/files.service";
import { Externaltransfer } from "../../models/externaltransfer.model";
import { ExternaltransfersService } from "../../services/externaltransfers.service";
@Component({
    selector: 'app-transfers-list',
    templateUrl: './transfers-list.component.html',
    styleUrls: ['./transfers-list.component.scss']
})
export class TransfersListComponent implements OnInit {

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
        "steps.general",
        "Details",
        "Cost-center",
        "Product",



    ];

    loading = false;
    transfers: Array<Externaltransfer> = [];
    transfer: Externaltransfer = {};
    transfersPage: Page<Externaltransfer> = initPage;
    pageNumber = 0;
    pageSize = 4;
    filter = "";
    onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
    searchPrice!: number;
    searchLocationCode!: string;

    file: File | null = null;

    constructor(
        private externaltransfersService: ExternaltransfersService,
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
        this.externaltransfersService
            .findPage(this.pageNumber, this.pageSize, this.filter)
            .subscribe({
                next: (result) => {
                    this.transfers = result.content;
                    this.transfersPage = result;
                },
                error: (error) => {
                    this.loading = false;
                    console.error(error);
                },
                complete: () => (this.loading = false),
            });
    }

    findById(refNumber: string) {
        this.externaltransfersService.findById(refNumber).subscribe({
            next: (result) => (this.transfer = result),
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
        this.transfer = {
            //fournisseur: {},
        };
        this.currentStep = 0;
    }


    findArchivedExternals() {
        console.log("calling archiiiiiiiiiveee");
        this.externaltransfersService
            .findArchivedExternals(this.pageNumber, this.pageSize, this.filter)
            .subscribe({
                next: (result) => {
                    this.transfers = result.content; // Update this line
                    this.transfersPage = result; // Assuming this is used for pagination information
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
        this.externaltransfersService.importCSV(formData).subscribe({
            next: () => {
                this.importModal.hide();
                this.findPage();
                this.file = null;
                this.toastService.close("0");
                this.toastService.success(
                    this.translateService.instant("Transfer imported successfully ! ", {
                        elem: this.translateService.instant("menu.transfers"),
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
            title: "menu.import-transfers",
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


        this.externaltransfersService.create(this.transfer!).subscribe({
            next: () => {
                this.findPage();
                this.formModal.hide();
                this.onCancel();
                this.toastService.close("0");
                console.log("5555555555555555 call add product", this.transfer);
                this.toastService.success(
                    this.translateService.instant("External inventory saved successfully ! ", {
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

        console.log("Calling onSaveUpdate inventoy:", this.transfer);

        this.externaltransfersService.update(id, this.transfer!).subscribe({
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

    onWizardSaveAddForm(refNumber: string | null) {
        console.log("onWizardSaveAddForm called");
        if (this.stepper.lastStep()) {
            this.onSaveAdd(refNumber);
            return;
        }
        this.stepper.nextStep();
    }

    onWizardSaveUpdateForm(refNumber: string) {
        if (this.stepper.lastStep()) {
            this.onSaveUpdate(refNumber);
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
            title: "menu.add-transfer",
            stepsCount: this.steps.length - 1,
            confirm: () => this.onWizardSaveAddForm(null),
            cancel: () => this.onCancel(),
            prev: () => this.stepper.prevStep(),
        });
    }

    onClickEditForm(refNumber: string) {
        this.externaltransfersService.findById(refNumber).subscribe(
            (result) => {
                this.transfer = result;
                this.formModal.show({
                    title: "menu.edit-transfer",
                    stepsCount: this.steps.length - 1,
                    confirm: () => this.onWizardSaveUpdateForm(refNumber),
                    cancel: () => this.onCancel(),
                    prev: () => this.stepper.prevStep(),
                });
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onClickDelete(refNumber: string) {
        this.deleteModal.show(() => {
            this.toastService.loading(
                this.translateService.instant("message.loading..."),
                {
                    id: "0",
                }
            );
            this.externaltransfersService.delete(refNumber).subscribe({
                next: () => {
                    this.findPage();
                    this.deleteModal.hide();
                    this.toastService.close("0");
                    this.onFilterChange("");
                    this.toastService.success(
                        this.translateService.instant("inventory deleted successfully ! ", {
                            elem: this.translateService.instant("transfer"),
                        })
                    );
                },
                error: (error) => {
                    this.deleteModal.hide();
                    this.toastService.close("0");
                    this.toastService.error(
                        this.translateService.instant(error.error, {
                            elem: this.translateService.instant("transfer"),
                        })
                    );
                },
            });
        });
    }
    /*

    onClickArchive(id: string) {
        this.deleteModal.show(() => {
            this.externaltransfersService.archive(id).subscribe({
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





    searchProducts(): void {
        this.produitsService.searchProds(this.searchTaxRate, this.searchCategory)
            .subscribe((produits: Produit[]) => {
                this.produits = produits;
            });
    }

*/
    searchExternals(): void {
        this.externaltransfersService.searchExternals(this.searchPrice, this.searchLocationCode)
            .subscribe((transfers: Externaltransfer[]) => {
                this.transfers = transfers;
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

    onDownloadCSVTempalte() {

        this.externaltransfersService.downloadCSVTemplate().subscribe({
            next: (data) =>
                this.filesService.download(
                    data,
                    this.translateService.instant("menu.externals") + ".csv"
                ),
            error: (error) => console.error(error),
        });




    }
}