import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[NgbDropdownConfig]
})
export class HeaderComponent {
  selectedLanguage = 'en';
constructor(config: NgbDropdownConfig,public translate: TranslateService){
  config.autoClose = "outside";
  translate.addLangs(['en','fr']);
  translate.setDefaultLang('en'); 
  this.translate.use(this.selectedLanguage);
}
switchLang(lang: string){
  this.translate.use(lang);
}

languages = [
  { code: 'en', label: 'EN', flag: 'assets/flags/en.png' },
  { code: 'fr', label: 'FR', flag: 'assets/flags/fr.png' }
];

changeLanguage(language: string) {
 this.selectedLanguage = language;
  this.translate.use(language); 
}

}
