import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from './../_services/device.service';
import {Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {HistoriqueService} from "../_services/historique.service";
import {Observable} from "rxjs";
import {SensorService} from "../_services/sensor.service";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit{

  id!: string;
  device!: any;
  sensorList !: any;
  startDate = new Date();
  endDate = new Date();

  constructor(private DeviceService: DeviceService, private router: Router,
              private cookieService: CookieService, private sv: HistoriqueService,
              private route: ActivatedRoute, private snv: SensorService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);

    });
    console.log("heeee");

    this.DeviceService.DeviceDetails(this.id).subscribe(data => {
      this.device = data;
    });
    this.DeviceService.DeviceSensor(this.id).subscribe(data => {
      this.sensorList = data;

    });
  }
  ngOnInit() {
    this.snv.HistoriquePpageable(this.id,"0").subscribe((data)=>{
      let nb=data.totalPages
      console.log(nb)
    for (let i = 1; i <= nb; i++){
      this.snv.HistoriquePageable(this.id,i.toString()).subscribe();
    }})
  }
}
