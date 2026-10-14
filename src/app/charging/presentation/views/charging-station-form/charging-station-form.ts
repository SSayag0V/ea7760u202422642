import {Component, effect, inject, signal} from '@angular/core';
    import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
    import {ActivatedRoute, Router} from '@angular/router';
    import {MatButtonModule} from '@angular/material/button';
    import {MatFormFieldModule} from '@angular/material/form-field';
    import {MatInputModule} from '@angular/material/input';
    import {TranslatePipe} from '@ngx-translate/core';
    import {SharedStore} from '../../../../shared/application/shared.store';
    import {ChargingStation} from '../../../../shared/domain/model/charging-station.entity';

    /**
     * Creates and edits charging-station entities.
     */
    @Component({
      selector:    'app-charging-station-form',
      imports:     [MatFormFieldModule, MatInputModule, MatButtonModule,
                    ReactiveFormsModule, TranslatePipe],
      templateUrl: './charging-station-form.html',
      styleUrl:    './charging-station-form.css'
    })
    export class ChargingStationForm {
      private fb     = inject(FormBuilder);
      private route  = inject(ActivatedRoute);
      private router = inject(Router);
      private store  = inject(SharedStore);

      form = this.fb.group({
        stationName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    vehicleType: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    maxGridKwCapacity: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
    stallsAvailable: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
    isActive: new FormControl<boolean>(false, {nonNullable: true, validators: [Validators.required]}),
    locationCoordinates: new FormControl<unknown>('', {nonNullable: true, validators: [Validators.required]}),
      });

      isEdit    = false;
      itemId: string | null = null;
      private readonly itemIdSignal = signal<string | null>(null);
      private readonly editItemLoaded = signal(false);

      constructor() {
        this.route.params.subscribe(params => {
          this.itemId = params['id'] ? String(params['id']) : null;
          this.isEdit = this.itemId !== null;
          this.form.reset();
          this.editItemLoaded.set(false);
          this.itemIdSignal.set(this.itemId);
        });
        effect(() => {
          const id = this.itemIdSignal();
          if (id === null || this.editItemLoaded()) return;
          const item = this.store.chargingStations().find((candidate: any) => candidate.id === id);
          if (!item) return;
          this.form.patchValue({ stationName: item.stationName,
          vehicleType: item.vehicleType,
          maxGridKwCapacity: item.maxGridKwCapacity,
          stallsAvailable: item.stallsAvailable,
          isActive: item.isActive,
          locationCoordinates: item.locationCoordinates, }, {emitEvent: false});
          this.editItemLoaded.set(true);
        });
      }

      submit() {
        if ((this.isEdit && !this.editItemLoaded()) || this.form.invalid) return;
        const item = new ChargingStation({
          id: this.itemId ?? 'new',
          stationName: this.form.value.stationName!,
      vehicleType: this.form.value.vehicleType!,
      maxGridKwCapacity: this.form.value.maxGridKwCapacity!,
      stallsAvailable: this.form.value.stallsAvailable!,
      isActive: this.form.value.isActive!,
      locationCoordinates: this.form.value.locationCoordinates!,
        });

        if (this.isEdit) this.store.updateChargingStation(item);
        else             this.store.addChargingStation(item);
        void this.router.navigateByUrl('/charging-stations');
      }

      cancel() {
        void this.router.navigateByUrl('/charging-stations');
      }
    }
