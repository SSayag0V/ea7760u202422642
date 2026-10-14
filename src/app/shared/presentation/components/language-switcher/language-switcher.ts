import {Component, inject} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslateService} from '@ngx-translate/core';

/**
 * Switches the active locale used by the translation service.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule],
  templateUrl: './language-switcher.html',
  styleUrl:    './language-switcher.css'
})
export class LanguageSwitcher {
  protected currentLang = 'en';
  protected languages: string[];
  private translate: TranslateService;

  constructor() {
    this.translate = inject(TranslateService);
    this.currentLang = this.translate.getCurrentLang() ?? 'en';
    this.languages = [...this.translate.getLangs()];
  }

  useLanguage = (language: string) => {
    this.translate.use(language);
    this.currentLang = language;
  };
}
