import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../company/services/shared.service';
import { Router } from "@angular/router";
import { BeginningInventory } from '../../../models/beginninginventory.model';
import { BeginninginventoryService } from '../../../services/beginninginventory.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
    selector: 'app-beginninginventory-transactions',
    templateUrl: './beginninginventory-transactions.component.html',
    styleUrls: ['./beginninginventory-transactions.component.scss']
})
export class BeginninginventoryTransactionsComponent implements OnInit {
    @Input() beginninginventory!: BeginningInventory // If you need to receive data from the parent

    //  @Input() addinventoryform: FormGroup; 
    @Input() formGroup: FormGroup; // Input to receive the form group from the parent component

    constructor(
        private formBuilder: FormBuilder,
        private sharedService: SharedService
    ) {
    }
    addform: FormGroup;

    ngOnInit(): void {

        console.log('ngOnInit  before init formtt :', this.beginninginventory);

        this.initForm();
        console.log('ngOnInit  before init formtt :', this.beginninginventory);

    }
    initForm() {
        const initialDate = new Date(); // This creates a Date object with the current date and time
        const initialTime = `${initialDate.getHours()}:${initialDate.getMinutes()}:${initialDate.getSeconds()}`;
        this.addform = this.formBuilder.group({

            //   this.addinventoryform = this.formBuilder.group({
            codeDeTransaction: ["codeDeTransaction", Validators.required],
            dateDeEvenement: [initialDate, [Validators.required]],
            dateExpiration: [initialDate, [Validators.required]],
            temps: [initialTime, [Validators.required]],

        });



    }


    get f() {
        return this.addform.controls;
    }
    geValues(event) {
        const inventoryData = this.addform.value as BeginningInventory;
        // console.log("111111111111111111111111111the beginning inventory  :", inventoryData);
        this.beginninginventory = inventoryData; // Set the data in this.beginninginventory
        if (this.addform.invalid) {
            console.log('FFFFFFFFFFFFFFFFFFFFFFForm is invalid.');
            this.sharedService.setIsActive(false);

            return;
        }
        console.log('*********Form data:', this.beginninginventory);

        this.sharedService.setIsActive(true);

         console.log('Data emitted from child component:', inventoryData);

    }

    emitDataToMainForm() {
        if (this.addform.valid) {
            this.formGroup.patchValue({
                codeDeTransaction: this.addform.get('codeDeTransaction').value,
                dateDeEvenement: this.addform.get('dateDeEvenement').value,
                dateExpiration: this.addform.get('dateExpiration').value,
                temps: this.addform.get('temps').value,
            });
        }
    }
    }


