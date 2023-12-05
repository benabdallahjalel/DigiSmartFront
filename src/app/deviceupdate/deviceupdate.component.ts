import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../_services/device.service';
import { Device } from '../request/device';
import { SensorService } from '../_services/sensor.service';

@Component({
  selector: 'app-deviceupdate',
  templateUrl: './deviceupdate.component.html',
  styleUrls: ['./deviceupdate.component.css']
})
export class DeviceupdateComponent implements OnInit {
  
  id !:string;
  device !:any;
  sensors !:any;
  sensorsList !:any;
  isActive: boolean = false;
  listeSensordeleted : Set<string> = new Set();
  listeSensorsAdded : Set<string> = new Set();
  public constructor(private route:ActivatedRoute,private deviceService:DeviceService,private sensorService:SensorService,private router:Router){
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);

    });
  }

  ngOnInit(): void {
    this.deviceService.DeviceById(this.id).subscribe(data=> {this.device = data;
    });
    this.deviceService.DeviceSensor(this.id).subscribe(data=>this.sensors=data);
    this.sensorService.sensorList().subscribe(data=>this.sensorsList=data);
      
  }

  updateDevice(){
    console.log(this.device);
    console.log(this.listeSensordeleted);
    this.listeSensordeleted.forEach(sensor => {
      const index = this.device.sensorList.indexOf(sensor);
      if (index > -1) {
        this.device.sensorList.splice(index, 1);
      }
    });
    this.listeSensorsAdded.forEach(sensor=>{
      this.device.sensorList.push(sensor);
    })
    console.log(this.device);
    this.deviceService.updateDevice(this.id,this.device).subscribe((data)=>{console.log(data);
    if(this.device.active != this.isActive){
      this.deviceService.DeviceStatus(this.id).subscribe(data=>console.log(data));
    }
    this.router.navigate(['devices/liste']);});
    
  }
  toggleActive(checked: boolean) {
    this.isActive = checked;
  }

  checkedSensor(IDSENSOR:any){
    
    if(this.listeSensordeleted.has(IDSENSOR)){
      this.listeSensordeleted.delete(IDSENSOR)
    }else{
      this.listeSensordeleted.add(IDSENSOR)
    }
    console.log(this.listeSensordeleted);
  //  this.listeSensor.add(IDSENSOR) ;
   // this.listeSensor.remove(IDSENSOR)
  }
  checkedSensor1(IDSENSOR:any){
    
    if(this.listeSensorsAdded.has(IDSENSOR)){
      this.listeSensorsAdded.delete(IDSENSOR)
    }else{
      this.listeSensorsAdded.add(IDSENSOR)
    }
    console.log(this.listeSensorsAdded);
  //  this.listeSensor.add(IDSENSOR) ;
   // this.listeSensor.remove(IDSENSOR)
  }
  

}
