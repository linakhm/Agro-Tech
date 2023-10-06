import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { SharedService } from '../../../../company/services/shared.service';
import { ProduitsService } from '../../../../produits/services/produits.service';
import { BeginningInventory } from '../../../models/beginninginventory.model';
import { BeginninginventoryService } from '../../../services/beginninginventory.service';

@Component({
    selector: 'app-beginninginventory-products',
    templateUrl: './beginninginventory-products.component.html',
    styleUrls: ['./beginninginventory-products.component.scss']
})

export class BeginninginventoryProductsComponent implements OnInit {
    @Input() beginninginventory!: BeginningInventory; // If you need to receive data from the parent
    @Input() formGroup: FormGroup; 
    //  @Input() formGroup: FormGroup; 
  //  @Output() dataEmitted: EventEmitter<BeginningInventory> = new EventEmitter<BeginningInventory>();

    productCodes: string[] = [];

    constructor(private router: Router, private formBuilder: FormBuilder, private sharedService: SharedService,
        private produitsService: ProduitsService,
        private beginninginventoryService: BeginninginventoryService, private translate: TranslateService) { }
    addform: FormGroup; 
    //addinventoryform!: FormGroup;
    //productsForm: FormGroup;
    ngOnInit(): void {
        console.log('ngOnInit  before init formpp :', this.beginninginventory);

        this.initForm();
        console.log('ngOnInit  before init formpp :', this.beginninginventory);

    }
    initForm() {
        this.addform = this.formBuilder.group({
            //this.addinventoryform = this.formBuilder.group({
            typeDeProduit: ["typeDeProduit", Validators.required],
            codeProduit: ["codeProduit", Validators.required],
            nomDuProduit: ["nomDuProduit", Validators.required],
            uniteDinventaire: [0, Validators.required],
            prixUnitaire: [0, Validators.required],
            codeDeLot: [0, [Validators.required, RxwebValidators.unique({ message: 'code de Lot must be unique' })]],
            codeDeLocalisation: [0, Validators.required]
        });

    }

    geValues(event) {
        const inventoryData = this.addform.value as BeginningInventory;
        // console.log("111111111111111111111111111the beginning inventory  :", inventoryData);
        this.beginninginventory = inventoryData; // Set the data in this.beginninginventory
        if (this.addform.invalid) {
            this.sharedService.setIsActive(false);
            console.log('FFFFFFFFFFFFFFFFFFFFFFForm is invalid.');
            return;
        }
        console.log('*********Form data:', this.beginninginventory);

        this.sharedService.setIsActive(true);

    }


    get f() {
        return this.addform.controls;
    }
    emitDataToMainForm() {
         if (this.addform.valid) {
             this.formGroup.patchValue({
                 typeDeProduit: this.addform.get('typeDeProduit').value,
                 codeProduit: this.addform.get('codeProduit').value,
                 nomDuProduit: this.addform.get('nomDuProduit').value,
                 uniteDinventaire: this.addform.get('uniteDinventaire').value,
                 prixUnitaire: this.addform.get('prixUnitaire').value,
                 codeDeLot: this.addform.get('codeDeLot').value,
                 codeDeLocalisation: this.addform.get('codeDeLocalisation').value,
  
  
              });
          }
      }


    }

