import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Growout } from "app/modules/growout/models/growout";

@Component({
  selector: "app-growout-form-location",
  templateUrl: "./growout-form-location.component.html",
  styleUrls: ["./growout-form-location.component.scss"],
})
export class GrowoutFormLocationComponent implements OnInit {
  @Input() growout!: Growout;
  @ViewChild("myForm") myForm: NgForm;

  formData = {
    phone: "",
    email: "",

    // autres champs de formulaire
  };

  currentStep = 2;

  constructor() {}

  ngOnInit(): void {}

  onNextStep() {
    // validation du formulaire pour l'étape actuelle
    if (this.myForm.valid) {
      this.currentStep++;
    } else {
      // afficher des messages d'erreur ou autre traitement
      console.log("Veuillez remplir tous les champs obligatoires.");
    }
  }

  onPreviousStep() {
    this.currentStep--;
  }
}
