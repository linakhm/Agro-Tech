import { Component, Input, OnInit } from '@angular/core';
import { Growout } from '../../models/growout';

@Component({
  selector: 'app-growout-form',
  templateUrl: './growout-form.component.html',
  styleUrls: ['./growout-form.component.scss']
})
export class GrowoutFormComponent implements OnInit {


  @Input() growout!: Growout
  @Input() currentStep!: number

  constructor() { }

  ngOnInit(): void {
  }

}
