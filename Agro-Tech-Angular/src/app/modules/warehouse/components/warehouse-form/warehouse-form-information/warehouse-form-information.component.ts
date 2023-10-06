import { Component, OnInit, Input } from '@angular/core';
import { Warehouse } from '../../../models/warehouse.model';

@Component({
  selector: 'app-warehouse-form-information',
  templateUrl: './warehouse-form-information.component.html',
  styleUrls: ['./warehouse-form-information.component.scss']
})
export class WarehouseFormInformationComponent implements OnInit {

  @Input()
  warehouse: Warehouse = {}

  constructor() { }

  ngOnInit(): void {
  }

}
  