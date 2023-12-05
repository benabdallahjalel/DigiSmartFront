import { Component,OnInit } from '@angular/core';
import {HistoriqueService} from "../_services/historique.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import { data } from 'jquery';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css'],
})
export class HistoriqueComponent implements OnInit{
  id = "No param"
  Historique:any []= [];
  Sensors:any;
  DataId:any;
  currentPage = -1;
  pageSize = 10;

  constructor(private sv : HistoriqueService,private router: Router,private actR:ActivatedRoute ){}
  ngOnInit(): void {
    this.id = this.actR.snapshot.params['id'];
    console.log(this.id);
    this.sv.ListSensor(this.id).subscribe(data=>this.Sensors=data)
    this.sv.Historique(this.id).subscribe(res=>{this.Historique=res,console.log("historique")});
    //this.loadMore();
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
  findBySensor(idS:string){
    this.sv.HistoriqueBySensorAndDevice(idS,this.id).subscribe(data=>this.Historique=data);
    this.sv.findDataSensorByDeviceAndSensor(idS,this.id).subscribe(data=>{this.DataId=data;console.log(data)});
  }

  loadMore(): void {
    this.currentPage++;
    this.sv.getHistoriqueByDevice(this.id, this.currentPage, this.pageSize)
      .subscribe(page => {
        this.Historique = this.Historique.concat(page);
        console.log(this.Historique)
      });
  }

  
}
