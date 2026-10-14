import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Displays fallback content for unknown routes.
 */
@Component({
  selector:    'app-page-not-found',
  imports:     [MatButton, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl:    './page-not-found.css'
})
export class PageNotFound implements OnInit {
  protected invalidPath = '';
  private router: Router = inject(Router);

  ngOnInit() {
    this.invalidPath = this.router.url.split('?')[0];
  }

  protected navigateToHome() {
    this.router.navigate(['home']).then();
  }
}
