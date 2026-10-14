import {Component, inject, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Layout} from './shared/presentation/components/layout/layout';

/**
 * Root component that bootstraps localization and the application shell.
 */
@Component({
  selector:    'app-root',
  imports:     [Layout],
  templateUrl: './app.html',
  styleUrl:    './app.css'
})
export class App {
  protected readonly title = signal('ea7760u202422642');
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }
}
