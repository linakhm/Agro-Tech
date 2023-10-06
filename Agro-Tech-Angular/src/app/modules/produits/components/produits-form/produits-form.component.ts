import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Produit } from '../../models/produit.model';
import { ProduitsService } from '../../services/produits.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-produits-form',
  templateUrl: './produits-form.component.html',
  styleUrls: ['./produits-form.component.scss']
})
export class ProduitsFormComponent implements OnInit {

  @Input() produit!: Produit
  @Input() currentStep!: number
  addprodform: FormGroup;
    constructor(private produitsService: ProduitsService, private router:Router    ) { }

  ngOnInit(): void {
  }
 
}
