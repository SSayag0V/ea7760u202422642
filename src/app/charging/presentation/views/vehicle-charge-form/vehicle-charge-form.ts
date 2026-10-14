import {Component, effect, inject, signal} from '@angular/core';
    import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
    import {ActivatedRoute, Router} from '@angular/router';
    import {MatButtonModule} from '@angular/material/button';
    import {MatFormFieldModule} from '@angular/material/form-field';
    import {MatInputModule} from '@angular/material/input';
    import {TranslatePipe} from '@ngx-translate/core';
    import {SharedStore} from '../../../../shared/application/shared.store';
    import {VehicleCharge} from '../../../../shared/domain/model/vehicle-charge.entity';

    /**
     * Creates and edits vehicle-charge entities.
     */
    @Component({
      selector:    'app-vehicle-charge-form',
      imports:     [MatFormFieldModule, MatInputModule, MatButtonModule,
                    ReactiveFormsModule, TranslatePipe],
      templateUrl: './vehicle-charge-form.html',
      styleUrl:    './vehicle-charge-form.css'
    })
    export class VehicleChargeForm {
      private fb     = inject(FormBuilder);
      private route  = inject(ActivatedRoute);
      private router = inject(Router);
      private store  = inject(SharedStore);

      form = this.fb.group({
        stationId: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    vehicleType: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    makeId: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
    makeName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    kwDemand: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
    chargingPortType: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    isFastCharge: new FormControl<boolean>(false, {nonNullable: true, validators: [Validators.required]}),
      });

      isEdit    = false;
      itemId: number | null = null;
      private readonly itemIdSignal = signal<number | null>(null);
      private readonly editItemLoaded = signal(false);

      constructor() {
        this.route.params.subscribe(params => {
          this.itemId = params['id'] ? Number(params['id']) : null;
          this.isEdit = this.itemId !== null;
          this.form.reset();
          this.editItemLoaded.set(false);
          this.itemIdSignal.set(this.itemId);
        });
        effect(() => {
          const id = this.itemIdSignal();
          if (id === null || this.editItemLoaded()) return;
          const item = this.store.vehicleCharges().find((candidate: any) => candidate.id === id);
          if (!item) return;
          this.form.patchValue({ stationId: item.stationId,
          vehicleType: item.vehicleType,
          makeId: item.makeId,
          makeName: item.makeName,
          kwDemand: item.kwDemand,
          chargingPortType: item.chargingPortType,
          isFastCharge: item.isFastCharge, }, {emitEvent: false});
          this.editItemLoaded.set(true);
        });
      }

      submit() {
        if ((this.isEdit && !this.editItemLoaded()) || this.form.invalid) return;
        const item = new VehicleCharge({
          id: this.itemId ?? 0,
          stationId: this.form.value.stationId!,
      vehicleType: this.form.value.vehicleType!,
      makeId: this.form.value.makeId!,
      makeName: this.form.value.makeName!,
      kwDemand: this.form.value.kwDemand!,
      chargingPortType: this.form.value.chargingPortType!,
      isFastCharge: this.form.value.isFastCharge!,
      registeredAt: this.isEdit && this.itemId ? (this.store.getVehicleChargeById(this.itemId)()?.registeredAt ?? new Date().toISOString()) : new Date().toISOString(),
        });

        if (this.isEdit) this.store.updateVehicleCharge(item);
        else             this.store.addVehicleCharge(item);
        void this.router.navigateByUrl('/vehicle-charges');
      }

      cancel() {
        void this.router.navigateByUrl('/vehicle-charges');
      }
    }
