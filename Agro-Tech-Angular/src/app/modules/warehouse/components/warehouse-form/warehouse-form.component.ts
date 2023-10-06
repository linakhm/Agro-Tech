import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Warehouse } from '../../models/warehouse.model';

@Component({
  selector: 'app-warehouse-form',
  templateUrl: './warehouse-form.component.html',
  styleUrls: ['./warehouse-form.component.scss']
})
export class WarehouseFormComponent implements OnInit {

  @Input()
  warehouse: Warehouse = {}

  @Input()
  currentStep!: number
  costCenters = [
    {
      code: 'code 1',
      name: 'Cost center 1',
      type: 0
    },
    {
      code: 'code 2',
      name: 'Cost center 2',
      type: 1
    },
    {
      code: 'code 3',
      name: 'Cost center 3',
      type: 2
    }
  ]
  divisions = [
    {
      code: 'code 1',
      name: 'Division 1'
    },
    {
      code: 'code 2',
      name: 'Division 2'
    },
    {
      code: 'code 3',
      name: 'Division 3'
    }
  ]

  constructor() { }

  onCostCenterChange(event: any){
    const costCenter = this.costCenters.find(item => item.code == event)
    this.warehouse.costCenterCode = costCenter?.code
    this.warehouse.costCenterName = costCenter?.name
    this.warehouse.costCenterType = costCenter?.type
  }

  onDivisionChange(event: any){
    const division = this.divisions.find(item => item.code == event)
    this.warehouse.divisionCode = division?.code
    this.warehouse.divisionName = division?.name
  }

  onStepChange(step: number){
    console.log(step)
    this.currentStep = step
  }

  ngOnInit(): void {
  }

}
