import {
  Component,
  OnInit,
  Input,
  HostListener,
  OnChanges,
  ChangeDetectorRef,
  AfterViewChecked,
} from "@angular/core";
import { SharedService } from "app/modules/company/services/shared.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-wizard-dialog",
  templateUrl: "./wizard-dialog.component.html",
  styleUrls: ["./wizard-dialog.component.scss"],
})
export class WizardDialogComponent
  implements OnInit, OnChanges, AfterViewChecked
{
  @Input()
  type: string = null;
  @Input()
  field: [] = null;
  content: any;
  @Input()
  currentStep!: number;
  @Input()
  entity: any = null;
  wizard: any;
  wizardStep: any;

  isNext: boolean;
  isSave: boolean;
  subscription: Subscription;

  constructor(
    private sharedServ: SharedService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): any {
    this.wizardStep = 1;

    this.sharedServ.isActive$.subscribe((data) => {
      console.log("====================================");
      console.log("shared next button :", data);
      console.log("====================================");
    });

    // this.sharedServ.isTrue$.subscribe((data) => {
    //   console.log("====================================");
    //   console.log("shared next button :", data);
    //   console.log("====================================");
    // });

    this.subscription = this.sharedServ.isActive$.subscribe((response) => {
      this.isNext = response;
      console.log("====================================");
      console.log("is next 2 :", response);
      console.log("====================================");
    });

    // this.subscription = this.sharedServ.isTrue$.subscribe((response) => {
    //   this.isSave = response;
    //   console.log("====================================");
    //   console.log("is save 2 :", response);
    //   console.log("====================================");
    // });
  }

  show({ title, confirm, cancel, prev, stepsCount }: any) {
    console.log("====================================");
    console.log("nxt");
    console.log("====================================");
    this.content = {
      title,
      confirm,
      cancel: () => {
        this.content = null;
        if (cancel) {
          cancel();
        }
      },
      prev,
      stepsCount,
    };
  }

  actionBtnLabel() {
    return this.content && this.content.stepsCount === this.currentStep
      ? "btns.save"
      : "btns.next";
  }
  isfirstStep() {
    return this.content && this.currentStep === 0;
  }

  hide() {
    if (this.content.cancel) {
      this.content.cancel();
    }
    this.content = null;
  }

  protected onClickOutside(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.hide();
  }

  @HostListener("document:keydown.escape", ["$event"]) onKeydownHandler(
    evt: KeyboardEvent
  ) {
    this.hide();
  }

  // blockPr(event: Event) {
  //   console.log(this.entity);

  //   if (this.type == EntityTypeEnum.COMPANY) {
  //     if (this.isfirstStep()) {
  //       if (
  //         this.entity == null ||
  //         (this.entity != null &&
  //           (this.entity.code == undefined || this.entity.name == undefined))
  //       ) {
  //         event.stopPropagation();
  //         event.preventDefault();
  //         return false;
  //       } else {
  //         this.content.confirm();
  //       }
  //     } else {
  //       this.content.confirm();
  //     }
  //     //repeated for the other one
  //   } else if (this.type == EntityTypeEnum.FARM) {
  //     if (this.isfirstStep()) {
  //       if (
  //         this.entity == null ||
  //         (this.entity != null &&
  //           (this.entity.code == undefined || this.entity.name == undefined))
  //       ) {
  //         event.stopPropagation();
  //         event.preventDefault();
  //         return false;
  //       } else {
  //         this.content.confirm();
  //       }
  //     } else {
  //       this.content.confirm();
  //     }
  //   } else {
  //     if (this.content) this.content.confirm();
  //   }
  // }

  goTo(step: number) {
    this.wizardStep = step;
  }

  ngOnChanges() {
    this.subscription = this.sharedServ.isActive$.subscribe((response) => {
      console.log("====================================");
      console.log("is next 3 :", response);
      console.log("====================================");
    });

    //   this.subscription = this.sharedServ.isTrue$.subscribe((response) => {
    //     this.isSave = !response;
    //     console.log("====================================");
    //     console.log("is save 3 :", response);
    //     console.log("====================================");
    //   });
  }

  // ngAfterViewInit(): void {
  //   let a = document.getElementById("treu") as HTMLElement;
  //   a.classList.add("diabled");
  // }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
// enum EntityTypeEnum {
//   COMPANY = "company",
//   CROWOUT = "growout",
//   CURRENCIE = "currencie",
//   DIVISION = "division",
//   Cost = "cost",
//   FARM = "farm",
// }
