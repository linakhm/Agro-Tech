import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Externaltransfer } from '../../../models/externaltransfer.model';

@Component({
  selector: 'app-transfers-details',
  templateUrl: './transfers-details.component.html',
  styleUrls: ['./transfers-details.component.scss']
})
export class TransfersDetailsComponent implements OnInit {

    @Input() externaltransfer: Externaltransfer;

    addinventoryform: FormGroup; // Main form's FormGroup to hold all the fields

    constructor() { }

    ngOnInit(): void {
      //  if (!this.externaltransfer.transactionCode) {
      //     this.externaltransfer.product = {}; // You can initialize it with default values if needed



        
    }


    emitDataToMainForm() {
        if (this.addinventoryform.valid) {
            this.addinventoryform.patchValue({
                transactionCode: this.addinventoryform.get('transactionCode').value,
                inventoryUnits: this.addinventoryform.get('inventoryUnits').value,
                price: this.addinventoryform.get('price').value,
                unitPrice: this.addinventoryform.get('unitPrice').value,
                lotCode: this.addinventoryform.get('lotCode').value,
                locationCode: this.addinventoryform.get('locationCode').value,
                eventDate: this.addinventoryform.get('eventDate').value,
                expirationDate: this.addinventoryform.get('expirationDate').value,
                time: this.addinventoryform.get('time').value,
                comment: this.addinventoryform.get('comment').value,
                isVoid: this.addinventoryform.get('isVoid').value,

                // Add more properties for other sub-forms if needed
            });
        }
    }


}
