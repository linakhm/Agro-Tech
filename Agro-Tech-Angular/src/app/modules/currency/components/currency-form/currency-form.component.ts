import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../../models/currency';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnInit {

  @Input() currency!: Currency
  @Input() currentStep!: number
    
  constructor() { }

  ngOnInit(): void {
  }

}
