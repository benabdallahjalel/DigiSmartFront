import { Router } from '@angular/router';
//import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import {Sensor} from "../request/sensor";
import {HttpClient} from "@angular/common/http";
import {SensorService} from "../_services/sensor.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-addsensor',
  templateUrl: './addsensor.component.html',
  styleUrls: ['./addsensor.component.css'],
  /*animations: [
    trigger('checkboxAnimation', [
      state('unchecked', style({
        transform: 'rotate(0deg)'
      })),
      state('checked', style({
        transform: 'rotate(45deg)'
      })),
      transition('unchecked <=> checked', animate('200ms ease-in-out'))
    ])
  ]
*/
})
export class AddsensorComponent {


  sensor :Sensor = new Sensor();
  checkbox = false;

  constructor(private http:HttpClient,private service:SensorService
    , private router :Router) {
  }
  checkboxChecked = false;

  toggleInputs() {
    this.checkboxChecked = !this.checkboxChecked;
    if(this.checkboxChecked){
      this.sensor.rangeMin=4;
      this.sensor.rangeMax=20;
    }
  }

  toggleInputs1() {
    this.checkbox = !this.checkbox;
    if(this.checkbox){
      this.sensor.isPulse =true;
      console.log("********")
    }else{
      this.sensor.isPulse =false;
    }
  }

  onFormSubmit() {

    this.sensor.signal = true ; 
    this.service.addSensor(this.sensor).subscribe(data => console.log(data));
    this.router.navigate(['/sensor/liste'])
  }



}
