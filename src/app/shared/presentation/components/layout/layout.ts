import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {FooterContent} from '../footer-content/footer-content';

/**
 * Main shell component that hosts top-level navigation and routed content.
 */
interface NavigationOption { link: string; label: string; }

@Component({
  selector:    'app-layout',
  imports:     [RouterOutlet, RouterLink, RouterLinkActive,
                MatToolbarModule, MatButtonModule,
                TranslatePipe, LanguageSwitcher, FooterContent],
  templateUrl: './layout.html',
  styleUrl:    './layout.css'
})
export class Layout {
  options = signal<NavigationOption[]>([
    {link: "/home", label: "option.home"},
    {link: "/charging-stations", label: "option.charging-stations"},
    {link: "/games-service/search-games", label: "option.search-games"}
  ]);
}
