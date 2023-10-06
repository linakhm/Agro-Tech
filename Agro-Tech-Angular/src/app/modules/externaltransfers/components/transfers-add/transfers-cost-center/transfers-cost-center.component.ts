import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Externaltransfer } from '../../../models/externaltransfer.model';

@Component({
  selector: 'app-transfers-cost-center',
  templateUrl: './transfers-cost-center.component.html',
  styleUrls: ['./transfers-cost-center.component.scss']
})
export class TransfersCostCenterComponent implements OnInit {

    @Input() externaltransfer: Externaltransfer;

    addinventoryform: FormGroup; // Main form's FormGroup to hold all the fields

    constructor() { }

    ngOnInit(): void {
        if (!this.externaltransfer.externalSourceCostCenter) {
            this.externaltransfer.externalSourceCostCenter = {}; // You can initialize it with default values if needed
        }
    }

}
