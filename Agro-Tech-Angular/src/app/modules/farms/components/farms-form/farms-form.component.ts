import { Component, OnInit, Input } from '@angular/core';
import { Farm } from '../../models/farm';

@Component({
  selector: 'app-farms-form',
  templateUrl: './farms-form.component.html',
  styleUrls: ['./farms-form.component.scss']
})
export class FarmsFormComponent implements OnInit {

  @Input() farm!: Farm
  @Input() currentStep!: number

  constructor() { }

  ngOnInit(): void {
  }

}
