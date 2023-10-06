import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";

@Component({
  selector: "app-diver-list",
  templateUrl: "./diver-list.component.html",
  styleUrls: ["./diver-list.component.scss"],
})
export class DiverListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;
  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;
  @ViewChild("formModal")
  formModal!: WizardDialogComponent;
  @ViewChild("stepper")
  stepper!: StepperComponent;
  filter = "";
  pageNumber = 0;
  pageSize = 10;

  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;

  currentStep = 0;
  steps: any = ["steps.general", "steps.localisation"];

  constructor() {}

  ngOnInit(): void {}

  onClickAdd() {
    this.formModal.show({
      title: "menu.add",
      stepsCount: this.steps.length - 1,
    });
  }
}
