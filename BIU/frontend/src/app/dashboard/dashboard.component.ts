import {Component} from '@angular/core';
import {icon, latLng, marker, polyline, tileLayer} from 'leaflet';
import {AuthService} from '../auth/auth.service';

declare const ol: any;

@Component({
  selector: 'tsp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor() {}

}
