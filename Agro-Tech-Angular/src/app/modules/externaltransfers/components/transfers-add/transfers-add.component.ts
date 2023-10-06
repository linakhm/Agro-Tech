import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Externaltransfer } from '../../models/externaltransfer.model';
import { ExternaltransfersService } from '../../services/externaltransfers.service';

@Component({
  selector: 'app-transfers-add',
  templateUrl: './transfers-add.component.html',
  styleUrls: ['./transfers-add.component.scss']
})
export class TransfersAddComponent implements OnInit {

    @Input() externaltransfer!: Externaltransfer
    @Input() currentStep!: number
    addinventoryform: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder,
        private externaltransfersService: ExternaltransfersService) { }

    ngOnInit(): void {
    }


}
