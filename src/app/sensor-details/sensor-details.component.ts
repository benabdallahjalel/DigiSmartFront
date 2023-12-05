import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SensorService} from "../_services/sensor.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.css']
})
export class SensorDetailsComponent implements OnInit {
  sensor: any; // Replace 'any' with the appropriate type for your sensor data
  id:any;

  constructor(private http: HttpClient,private sv :SensorService,private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];});
  }

  ngOnInit(): void {
    // Fetch the sensor data from your backend using HttpClient
    this.sv.GetSensorByID(this.id).subscribe(
      (data) => {
        this.sensor = data;
      },
      (error) => {
        console.log('Error fetching sensor data:', error);
      }
    );
  }
}
