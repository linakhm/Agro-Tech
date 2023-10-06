import { Component, OnInit, Input } from '@angular/core';
import { Farm } from '../../../models/farm';

@Component({
  selector: 'app-farms-form-localisation',
  templateUrl: './farms-form-localisation.component.html',
  styleUrls: ['./farms-form-localisation.component.scss']
})
export class FarmsFormLocalisationComponent implements OnInit {
  @Input() farm!: Farm

  constructor() { }

  ngOnInit(): void {
  }

}
