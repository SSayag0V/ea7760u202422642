import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {ChargingStation} from '../../../domain/model/charging-station.entity';

/**
 * Displays a collection item as a card and exposes CRUD actions to its parent view.
 */
@Component({
  selector: 'app-charging-station-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './charging-station-card.html',
  styleUrl: './charging-station-card.css'
})
export class ChargingStationCard {
  @Input({ required: true }) item!: ChargingStation;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
}
