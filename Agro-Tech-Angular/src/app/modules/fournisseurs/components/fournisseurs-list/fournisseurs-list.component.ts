import { Component, OnInit, ViewChild, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { initPage, Page } from "app/shared/models";
import { FilesService } from "app/shared/services/files/files.service";
import { Fournisseur } from "../../models/fournisseur.model";
import { FournisseursService } from "../../services/fournisseurs.service";
import { HotToastService } from "@ngneat/hot-toast";

@Component({
    selector: "app-fournisseurs-list",
    templateUrl: "./fournisseurs-list.component.html",
    styleUrls: ["./fournisseurs-list.component.scss"],
})
export class FournisseursListComponent implements OnInit {
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
        "steps.general",
        "steps.information",
        "steps.shippingLocation",
        //  "steps.vendorSKU",
    ];

    loading = false;
    fournisseurs: Array<Fournisseur> = [];
    fournisseur: Fournisseur = {
        isDeleted: false
    };
    //fournisseur: any;
    fournisseursPage: Page<Fournisseur> = initPage;
    pageNumber =5;
    pageSize = 0;
    filter = "";
    onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

    file: File | null = null;
    searchName!: string;
    searchNameCity!: string;

    constructor(
        private fournisseursService: FournisseursService,
        private filesService: FilesService,
        private translateService: TranslateService,
        private toastService: HotToastService
    ) { }

    ngOnInit(): void {
        this.findPage();
        this.onPaginationChange.subscribe(() => this.findPage());

    }


   /* findPage() {
        this.loading = true;
        this.fournisseursService
            .findPage(this.pageNumber, this.pageSize, this.filter)
            .subscribe({
                next: (result) => {
                    this.fournisseurs = result.content;
                    this.fournisseursPage = result;
                },
                error: (error) => {
                    this.loading = false;
                    console.error(error);
                },
                complete: () => (this.loading = false),
            });
    }*/
    findPage() {
        this.loading = true;
        this.fournisseursService
            .findPage(this.pageNumber, this.pageSize, this.filter)
            .subscribe({
                next: (result) => {
                    console.log("API Response Data:", result); // Add this line
                    this.fournisseurs = result.content;
                    this.fournisseursPage = result;
                },
                error: (error) => {
                    this.loading = false;
                    console.error(error);
                },
                complete: () => (this.loading = false),
            });
    }

    findById(id: string) {
        this.fournisseursService.findById(id).subscribe({
            next: (result) => (this.fournisseur = result),
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
        this.findPage();
        // this.onPaginationChange.emit("");
    }

    onPageSizeChange(pageSize: number) {
        this.pageSize = pageSize;
        this.pageNumber = 0;
        this.findPage();

        //this.onPaginationChange.emit("");
    }

    onCancel() {
        this.fournisseur = {
            isDeleted:false
        };
        this.currentStep = 0;
    }

    onSaveAdd(id: string | null) {
        this.toastService.loading(
            this.translateService.instant("message.loading..."),
            { id: "0" }
        );
        this.fournisseursService.create(this.fournisseur!).subscribe({
            next: () => {
                this.findPage();
                this.formModal.hide();
                this.onCancel();
                this.toastService.close("0");
                console.log("5555555555555555 call add");

                this.toastService.success(
                    this.translateService.instant("Saved successfully ! ", {
                        elem: this.translateService.instant("vendor"),
                    })
                );
            },
            error: (error) => {
                this.toastService.close("0");
                this.toastService.error(
                    this.translateService.instant(error.error, {
                        elem: this.translateService.instant("vendor"),
                    })
                );
            },
        });
    }

    /*onSaveUpdate(id: string ) {
        this.toastService.loading(
            this.translateService.instant("message.loading..."),
            { id: "0" }
        );

        this.fournisseursService.update(id,this.fournisseur!).subscribe({
            next: () => {
                this.findPage();
                this.formModal.hide();
                this.onCancel();
                this.toastService.close("0");
                this.toastService.success(
                    this.translateService.instant("success.saved", {
                        elem: this.translateService.instant("vendor"),
                    })
                );
            },
            error: (error) => {
                this.toastService.close("0");
                this.toastService.error(
                    this.translateService.instant(error.error, {
                        elem: this.translateService.instant("vendor"),
                    })
                );
            },
        });
    }*/

    onSaveUpdate(id: string) {

        this.toastService.loading(
            this.translateService.instant("message.loading..."),
            { id: "0" }
        );

        console.log("Calling onSaveUpdate vendooor:", this.fournisseur);

        this.fournisseursService.update(id, this.fournisseur!).subscribe({
            next: () => {
                console.log("Updated successfully !"); // Check if this log is printed
                this.findPage();
                this.formModal.hide();
                this.onCancel();
                this.toastService.close("0");
                this.toastService.success(
                    this.translateService.instant("Updated successfully !", {
                        elem: this.translateService.instant("vendor"),
                    })
                );
            },
            error: (error) => {
                console.error("**********Update error:", error); // Check if this log is printed
                console.log("************Error response:", error.response); // Log the error response
                console.log("************Error status:", error.status); // Log the HTTP status code
                console.log("*************Error message:", error.message); // Log the error message
                this.toastService.close("0");
                this.toastService.error(
                    this.translateService.instant(error.error, {
                        elem: this.translateService.instant("vendor"),
                    })
                );
            },

        });
    }


    onDownloadCSVTempalte() {

        this.fournisseursService.downloadCSVTemplate().subscribe({
            next: (data) =>
                this.filesService.download(
                    data,
                    this.translateService.instant("menu.vendors") + ".csv"
                ),
            error: (error) => console.error(error),
        });

        /* this.fournisseursService.downloadCSVTemplate().subscribe(data => {
             const blob = new Blob([data], { type: 'text/csv' });
             const fileName = 'Vendors.csv';
             saveAs(blob, fileName);
 
         });*/


    }

    onCSVChange(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (!fileList) {
            return;
        }
        this.file = fileList[0];
    }



    searchVendors(): void {
        this.fournisseursService.searchVendors(this.searchName, this.searchNameCity)
            .subscribe((fournisseurs: Fournisseur[]) => {
                this.fournisseurs = fournisseurs;
            });
    }

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
        this.fournisseursService.importCSV(formData).subscribe({
            next: () => {
                this.toastService.close("0");
                this.importModal.hide();
                this.findPage();
                this.file = null;
                this.toastService.success(
                    this.translateService.instant("CSV imported successfully !", {
                        elem: this.translateService.instant("menu.vendors"),
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
            title: "menu.import-vendors",
            btnLabel: "btns.import",
            confirm: () => this.onCSVImport(),
            cancel: () => (this.file = null),
        });
    }

    onWizardSaveAdd(id: string | null) {
        if (this.stepper.lastStep()) {
            this.onSaveAdd(id);
            return;
        }
        this.stepper.nextStep();
    }

    onWizardSaveUpdate(id: string) {
        if (this.stepper.lastStep()) {
            this.onSaveUpdate(id);
            return;
        }
        this.stepper.nextStep();
    }
    onStepChange(step: number) {
        this.currentStep = step;
    }

    onClickAdd() {
        this.formModal.show({
            title: "menu.add-vendor",
            stepsCount: this.steps.length - 1,
            confirm: () => this.onWizardSaveAdd(null),
            cancel: () => this.onCancel(),
            prev: () => this.stepper.prevStep(),
        });
    }

    onClickEdit(id: string) {
        this.fournisseursService.findById(id).subscribe(
            (result) => {
                this.fournisseur = result;
                this.formModal.show({
                    title: "menu.edit-vendor",
                    stepsCount: this.steps.length - 1,
                    confirm: () => this.onWizardSaveUpdate(id),
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
        //console.log('Delete clicked:', id);

        this.deleteModal.show(() => {
            this.toastService.loading(
                this.translateService.instant("message.loading..."),
                {
                    id: "0",
                }
            );
            this.fournisseursService.delete(id).subscribe({
                next: () => {
                    this.findPage();
                    this.deleteModal.hide();
                    this.toastService.close("0");
                    this.onFilterChange("");
                    this.toastService.success(
                        this.translateService.instant("Deleted successfully ! ", {
                            elem: this.translateService.instant("vendor"),
                        })
                    );
                },
                error: (error) => {
                    console.log(error);
                    this.deleteModal.hide();
                    this.toastService.close("0");
                    this.toastService.error(
                        this.translateService.instant(error.error, {
                            elem: this.translateService.instant("vendor"),
                        })
                    );
                },
            });
        });
    }

    onClickArchive(id: string) {
        this.deleteModal.show(() => {
            this.fournisseursService.archive(id).subscribe({
                next: () => {
                    this.deleteModal.hide();
                    this.toastService.success('Vendor archived successfully');
                    // Remove the archived vendor from the initial list
                    this.fournisseurs = this.fournisseurs.filter(p => p.id !== id);
                },
                error: (error) => {
                    console.error(error);
                    // Handle error
                },
            });
        });
    }

    sortByNameValid: boolean = true;
    sortByName() {
        if (this.sortByNameValid) {
            this.fournisseurs.sort((a, b) => a.name.localeCompare(b.name));
            this.sortByNameValid = false
        } else {
            this.fournisseurs.sort((a, b) => b.name.localeCompare(a.name));
            this.sortByNameValid = true
        }
    }

    sortByemailValid: boolean = true;
    sortByemail() {
        if (this.sortByemailValid) {
            this.fournisseurs.sort((a, b) => a.email.localeCompare(b.email));
            this.sortByemailValid = false
        } else {
            this.fournisseurs.sort((a, b) => b.email.localeCompare(a.email));
            this.sortByemailValid = true
        }
    }


    sortByTypeValid: boolean = true;
    sortByType() {
        if (this.sortByTypeValid) {
            this.fournisseurs.sort((a, b) => (a.type || "").localeCompare((b.type || "")));
            this.sortByTypeValid = false
        } else {
            this.fournisseurs.sort((a, b) => (b.type || "").localeCompare((a.type || "")));
            this.sortByTypeValid = true
        }
    }

    sortByphoneValid: boolean = true;
    sortByphone() {
        if (this.sortByphoneValid) {
            this.fournisseurs.sort((a, b) => (a.phone || "").localeCompare((b.phone || "")));
            this.sortByphoneValid = false
        } else {
            this.fournisseurs.sort((a, b) => (b.phone || "").localeCompare((a.phone || "")));
            this.sortByphoneValid = true
        }
    }

    sortBycurrencyCodeValid: boolean = true;
    sortBycurrencyCode() {
        if (this.sortBycurrencyCodeValid) {
            this.fournisseurs.sort((a, b) => (a.currencyCode || "").localeCompare((b.currencyCode || "")));
            this.sortBycurrencyCodeValid = false
        } else {
            this.fournisseurs.sort((a, b) => (b.currencyCode || "").localeCompare((a.currencyCode || "")));
            this.sortBycurrencyCodeValid = true
        }
    }

    sortBynameCityValid: boolean = true;
    sortBynameCity() {
        if (this.sortBynameCityValid) {
            this.fournisseurs.sort((a, b) => (a.nameCity || "").localeCompare((b.nameCity || "")));
            this.sortBynameCityValid = false
        } else {
            this.fournisseurs.sort((a, b) => (b.nameCity || "").localeCompare((a.nameCity || "")));
            this.sortBynameCityValid = true
        }
    }
    sortByshippingAddressValid: boolean = true;
    sortByshippingAddress() {
        if (this.sortByshippingAddressValid) {
            this.fournisseurs.sort((a, b) => (a.shippingAddress || "").localeCompare((b.shippingAddress || "")));
            this.sortByshippingAddressValid = false
        } else {
            this.fournisseurs.sort((a, b) => (b.shippingAddress || "").localeCompare((a.shippingAddress || "")));
            this.sortByshippingAddressValid = true
        }
    }
    onDownloadPDFTempalte() {

        this.fournisseursService.downloadPDFTemplate().subscribe({
            next: (data) =>
                this.filesService.download(
                    data,
                    this.translateService.instant("menu.fournisseurs") + ".pdf"
                ),
            error: (error) => console.error(error),
        });

    }
}