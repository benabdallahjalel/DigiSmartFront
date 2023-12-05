import { DeviceService } from './../_services/device.service';
import { Component, OnInit } from '@angular/core';
import { SensorService } from '../_services/sensor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tick } from '@angular/core/testing';
import { HistoriqueService } from "../_services/historique.service";
import { HttpResponse } from "@angular/common/http";
import { PaginationInstance } from "ngx-pagination";
import { style } from "@angular/animations";
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-device-historique',
  templateUrl: './device-historique.component.html',
  styleUrls: ['./device-historique.component.css']
})
export class DeviceHistoriqueComponent implements OnInit {
  id!: string;
  HistoriqueListe!: any;
  device !: any;
  message: string = "WAITING FOR DATA";
  Sensors: any;
  DataId: any;
  pdf: any;
  startDate = new Date();
  endDate = new Date();
  err!: string
  showAlert = false
  alertMsg = 'Please wait! your file is bieng expoted'
  alertColor = 'bleu'
  inSubmission = false
  visible: boolean = true;
  isFormDisabled = true;
  p = "0";
  constructor(private Sensorservice: SensorService, private DeviceService: DeviceService,
    private router: Router, private sv: HistoriqueService,
    private cookieService: CookieService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id);
    console.log(this.message)
    this.DeviceService.DeviceDetails(this.id).subscribe(data => {
      this.device = data
    })

    this.Sensorservice.HistoriquePageable(this.id, "0").subscribe(data => {
      this.HistoriqueListe = data;
      console.log(data);

      this.DataLoaded();
    });

  }
  ngOnInit(): void {
    this.sv.ListSensor(this.id).subscribe(data => this.Sensors = data)
  }

  DataLoaded() {
    this.message = "DataLoaded";
  }
  checkFormValidity(): void {
    this.isFormDisabled = !(this.startDate && this.endDate);
    if (this.isFormDisabled) {
      this.showAlert = true
      this.alertMsg = 'Please Select start and end dates'
      this.alertColor = 'danger'
    }
  }
  generatePDF() {

    this.sv.generateDataSensorHistoriquePdf(this.DataId).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'historique.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        // Handle error
      });
  }

  generateDevicePDF() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    console.log(monthsDiff);
    if (monthsDiff > 3) {
      this.showAlert = true
      this.alertMsg = 'Start and end dates must not be superior ay 3months'
      this.alertColor = 'danger'
      return;

    }
    this.showAlert = true
    this.alertMsg = 'Please wait! your file is bieng expoted'
    this.alertColor = 'blue'
    this.inSubmission = true
    this.sv.generateDeviceHistoriquePdf(this.id, this.startDate, this.endDate).subscribe(
      (response: HttpResponse<Blob>) => {
        const blob = response.body;
        if (blob !== null) {
          const pdfUrl = window.URL.createObjectURL(blob);
          this.alertMsg = 'File exported';
          this.alertColor = 'success';
          // Open the PDF in a new browser tab
          window.open(pdfUrl);
        } else {
          console.error('Blob is null.');
          this.alertMsg = 'Error occured';
          this.alertColor = 'danger';
          // Handle the case when blob is null
        }
      },
      (error: any) => {
        console.error(error); // Output the error to the console
        // Handle the error appropriately
      }
    );
  }
  findBySensor(idS: string) {
    if (idS === "Select a Sensor" || idS.length.valueOf() < 5) {
      this.pdf = null;
    } else { this.pdf = "ids" };
    console.log(this.pdf)
    // this.sv.HistoriqueBySensorAndDevice(idS,this.id).subscribe(data=>this.HistoriqueListe=data);
    this.sv.findDataSensorByDeviceAndSensor(idS, this.id).subscribe(data => { this.DataId = data; console.log(data) });
  }
  nextPage(page: string) {
    this.Sensorservice.HistoriquePageable(this.id, page).subscribe(data => {
      this.HistoriqueListe = data;
      console.log(data);

      this.DataLoaded();
    });
  }
  exportCSV() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Calculate the difference in months
    const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    console.log(monthsDiff);
    if (monthsDiff > 3) {
      this.showAlert = true
      this.alertMsg = 'Start and end dates must not be superior ay 3months'
      this.alertColor = 'danger'
      return;

    }

    const message = 'We will notify you when the file is uploaded.';
    const notificationOptions = {
      body: message
    };
    this.showAlert = true
    this.alertMsg = 'Please wait! your file is bieng expoted'
    this.alertColor = 'blue'
    this.inSubmission = true
    // Check if the browser supports notifications
    // if ('Notification' in window) {
    //   Notification.requestPermission().then(permission => {
    //     if (permission === 'granted') {
    //       // Create and display the notification
    //       new Notification('Export CSV', notificationOptions);
    //     }
    //   });
    // }
    this.sv.exportDataToCSV(this.id, this.startDate.toString(), this.endDate.toString()).pipe(
      finalize(() => {
        const audio = new Audio('/assets/Sound/wrong.mp3');
        audio.play();
        this.inSubmission = false;
        console.log("CSV");
      }),
      catchError(error => {
        const audio = new Audio('/assets/Sound/wrong.mp3');
        audio.play();
        this.alertMsg = 'An Error occurred';
        this.alertColor = 'danger';
        return of(null); // Use "of(null)" to handle the error and prevent further propagation
      })
    ).subscribe(
      res => {
        const audio = new Audio('/assets/Sound/wrong.mp3');
        audio.play();
        this.alertMsg = 'File exported';
        this.alertColor = 'success';
        console.log(res);
      }
    );
  }

  getCurrentDate(): string {
    const today = new Date();
    
    const yyyy = today.getFullYear();
    
    let mm: string | number = today.getMonth() + 1;
    let dd: string | number = today.getDate();
  
    
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (dd < 10) {
      dd = '0' + dd;
    }
  
   
    return `${yyyy}-${mm}-${dd}`;
  }
}