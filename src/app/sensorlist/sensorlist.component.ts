import { Component, OnInit } from '@angular/core';
import { Sensor } from "../request/sensor";
import { SensorService } from "../_services/sensor.service";
import { Router } from "@angular/router";
import {NgConfirmService} from "ng-confirm-box";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import backgroundColor = _default.defaults.backgroundColor;

@Component({
  selector: 'app-sensorlist',
  templateUrl: './sensorlist.component.html',
  styleUrls: ['./sensorlist.component.css']
})
export class SensorlistComponent implements OnInit {
  p: number = 1;

  sensor !: any;
  List !: any;
  search = '';

  constructor(private service: SensorService, private route: Router,private confirmService: NgConfirmService) {
  }

  ngOnInit() {
    this.SensorList();

  }


  SensorList() {
    this.service.sensorList().subscribe(data => { this.sensor = data; this.List = data });
  }

  DeleteSensor(id: string):void {
    const style = "color: red; font-size: 16px;background-color:white ";
    console.log("delete")
    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {
        this.service.DeleteSensor(id).subscribe(() => this.SensorList());
    },
      () => {
        console.log('Cancelled delete.');
    })
  }
  filterSensor() {
    this.sensor = this.List.filter((sensor: any) => { // Explicitly specify the type as 'any'
      for (let key in sensor) {
        const value = sensor[key];
        if (value && value.toString().toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }
}
