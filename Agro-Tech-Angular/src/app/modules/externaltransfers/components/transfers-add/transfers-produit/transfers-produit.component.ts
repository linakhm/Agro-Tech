import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Externaltransfer } from '../../../models/externaltransfer.model';
import { ExternaltransfersService } from '../../../services/externaltransfers.service';

@Component({
  selector: 'app-transfers-produit',
  templateUrl: './transfers-produit.component.html',
  styleUrls: ['./transfers-produit.component.scss']
})
export class TransfersProduitComponent implements OnInit {

    @Input() externaltransfer!: Externaltransfer
    @Input() currentStep!: number
    addinventoryform: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder,
        private externaltransferService: ExternaltransfersService) { }

    ngOnInit(): void {
    }



}
