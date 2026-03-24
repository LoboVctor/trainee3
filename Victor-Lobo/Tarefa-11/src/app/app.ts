import { Component } from '@angular/core';
import { VehicleFormComponent } from './vehicle-form/vehicle-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VehicleFormComponent],
  template: `<app-vehicle-form />`,
})
export class App {}