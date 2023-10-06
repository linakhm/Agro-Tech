import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { WizardDialogComponent } from "./components/wizard-dialog/wizard-dialog.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { NoDataComponent } from "./components/no-data/no-data.component";
import { TrashComponent } from "./components/trash/trash.component";
import { TrashCComponent } from "app/modules/company/trash/trashC.component";

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    DialogComponent,
    WizardDialogComponent,
    StepperComponent,
    PaginationComponent,
    SpinnerComponent,
    NoDataComponent,
    TrashComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ConfirmDialogComponent,
    DialogComponent,
    WizardDialogComponent,
    StepperComponent,
    PaginationComponent,
    SpinnerComponent,
    NoDataComponent,
  ],
})
export class SharedModule {}
