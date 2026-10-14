import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Shows configured project identifiers and author information.
 */
@Component({
  selector: 'app-about',
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  readonly nrc = "7760";
  readonly code = "u202422642";
  readonly author = "Sebastian Sayago";
}
