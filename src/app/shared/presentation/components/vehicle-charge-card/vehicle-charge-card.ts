import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {VehicleCharge} from '../../../domain/model/vehicle-charge.entity';

/**
 * Displays a collection item as a card and exposes CRUD actions to its parent view.
 */
@Component({
  selector: 'app-vehicle-charge-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, TranslatePipe, DatePipe],
  templateUrl: './vehicle-charge-card.html',
  styleUrl: './vehicle-charge-card.css'
})
export class VehicleChargeCard {
  @Input({ required: true }) item!: VehicleCharge;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
}
