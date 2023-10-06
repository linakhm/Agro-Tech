import { Component, OnInit, Input } from '@angular/core';
import { Fournisseur } from '../../models/fournisseur.model';
import {  Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { FournisseursService } from '../../services/fournisseurs.service';

@Component({
  selector: 'app-fournisseurs-form',
  templateUrl: './fournisseurs-form.component.html',
  styleUrls: ['./fournisseurs-form.component.scss']
})
export class FournisseursFormComponent implements OnInit {

  @Input() fournisseur!: Fournisseur
  @Input() currentStep!: number
    addform: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder,
    private fournisseurService: FournisseursService) { }

  ngOnInit(): void {
    }



}
