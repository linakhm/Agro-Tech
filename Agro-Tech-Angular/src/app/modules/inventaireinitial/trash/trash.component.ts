import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from '../../../shared/components/stepper/stepper.component';
import { WizardDialogComponent } from '../../../shared/components/wizard-dialog/wizard-dialog.component';
import { BeginningInventory } from '../models/beginninginventory.model';
import { Page, initPage } from "app/shared/models";
import { BeginninginventoryService } from '../services/beginninginventory.service';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponentB implements OnInit {
    @ViewChild("deleteModal")
    deleteModal!: ConfirmDialogComponent;

    @ViewChild("disarchiveModal")
    disarchiveModal!: ConfirmDialogComponent;

    @ViewChild("formModal")
    formModal!: WizardDialogComponent;

    @ViewChild("stepper")
    stepper!: StepperComponent;

    loading?= false;
    pageSize = 5;

    pageNumber = 0;
    filter = "";

    inventory: BeginningInventory = {
        isDeleted: false

    };
    inventories: Array<BeginningInventory> = [];
    Page: Page<BeginningInventory> = initPage;
    onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(private translateService: TranslateService,
        private router: Router,
        private toastService: HotToastService,
        private beginninginventoryService: BeginninginventoryService) { }


    ngOnInit(): void {
        this.findArchivedPage();
      //  console.log(this.findArchivedPage.length);
      //  this.onPaginationChange.subscribe(() => this.findArchivedPage());
    }

    findArchivedPage() {
        this.loading = true;
        console.log("Page Number:", this.pageNumber);
        console.log("Page Size:", this.pageSize);
        console.log("Filter:", this.filter);

        this.beginninginventoryService
            .findArchivedPage(this.pageSize, this.pageNumber,this.filter)
            .subscribe({
                next: (result) => {
                    this.inventories = result.content;
                    this.Page = result;
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
            next: (result) => (this.inventory = result),
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

    onClickdisArchive(id: string) {
        this.beginninginventoryService.disArchive(id).subscribe({
            next: () => {
                this.findArchivedPage();

                this.toastService.success(
                    this.translateService.instant("success.disarchived", {
                        elem: this.translateService.instant("Inventory"),
                    })
                );
                console.log(id);
            },
        });
    }

    goToInternalInventoriesList() {
        this.router.navigate(['/inventaires-initiaux']);
    }
    onClickDelete(id: string) {
        this.beginninginventoryService.delete(id).subscribe({
            next: () => {
                this.findArchivedPage();
                console.log("Success");
                this.toastService.success(
                    this.translateService.instant("success.deleted", {
                        elem: this.translateService.instant("Inventory"),
                    })
                );
            },
        });
    }
}
