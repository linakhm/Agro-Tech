import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { IconsModule } from "@progress/kendo-angular-icons";
import { ToolBarModule } from "@progress/kendo-angular-toolbar";
import {
  DateInputsModule,
  DatePickerModule,
  MultiViewCalendarModule,
} from "@progress/kendo-angular-dateinputs";

import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { BrowserModule } from "@angular/platform-browser";
import { CardComponent } from "app/components/card/card.component";
import { HomeComponent } from "app/home/home.component";

@NgModule({
  imports: [
    CommonModule,
    DropDownsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropDownsModule,
    MatAutocompleteModule,
    ToolBarModule,
    IconsModule,
    MatMenuModule,
    MatDialogModule,
    RouterModule,
    ChartsModule,
    ButtonsModule,
    InputsModule,
    DatePickerModule,
    DateInputsModule,
    MultiViewCalendarModule,
    LabelModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    HomeComponent,
    NotificationsComponent,
    UpgradeComponent,
    CardComponent,
  ],
})
export class AdminLayoutModule {}
