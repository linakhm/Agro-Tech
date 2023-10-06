import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  locale: string = ''

  constructor(
    private translate: TranslateService
  ){
    this.locale = localStorage.getItem('locale') ?? 'en'
    translate.setDefaultLang(this.locale)
  }

}
