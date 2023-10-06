import { Component, Input, OnInit } from '@angular/core';
import { Division } from '../../../models/division';

@Component({
  selector: 'app-division-from-localisation',
  templateUrl: './division-from-localisation.component.html',
  styleUrls: ['./division-from-localisation.component.scss']
})
export class DivisionFromLocalisationComponent implements OnInit {

  @Input() division!:Division
  constructor() { }

  ngOnInit(): void {
  }

}
