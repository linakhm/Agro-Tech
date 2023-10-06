import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BeginningInventory } from '../../models/beginninginventory.model';
import { BeginninginventoryService } from '../../services/beginninginventory.service';
import { BeginninginventoryDetailsComponent } from './beginninginventory-details/beginninginventory-details.component';
import { BeginninginventoryProductsComponent } from './beginninginventory-products/beginninginventory-products.component';
import { BeginninginventoryTransactionsComponent } from './beginninginventory-transactions/beginninginventory-transactions.component';

@Component({
    selector: 'app-beginninginventory-add',
    templateUrl: './beginninginventory-add.component.html',
    styleUrls: ['./beginninginventory-add.component.scss']
})
export class BeginninginventoryAddComponent implements OnInit {

//@Input() currentStep!: number   
//@ViewChild('beginninginventoryDetailsComponent') beginninginventoryDetailsComponent: BeginninginventoryDetailsComponent;

    @Input() beginninginventory: BeginningInventory = {
        isDeleted:false
        };


    @Input() currentStep!: number
    addform: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder,
        private beginninginventoryService: BeginninginventoryService) { }

    ngOnInit(): void {
       // this.addform = this.formBuilder.group({});

        

    }

  

    
}
