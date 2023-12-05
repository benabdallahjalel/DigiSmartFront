import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ChartConfiguration, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DeviceService } from '../_services/device.service';
import { HistoriqueService } from '../_services/historique.service';
import { DataSensorService } from '../_services/data.sensor';
import { BaseChartDirective } from 'ng2-charts';
import ChartZoomPlugin from 'chartjs-plugin-zoom';


import { Chart } from 'angular-highcharts';
import 'chartjs-plugin-zoom';






@Component({
  selector: 'app-graphe',
  templateUrl: './graphe.component.html',
  styleUrls: ['./graphe.component.css'],
  providers: [BaseChartDirective]
})
export class GrapheComponent {


  title = 'ng2-charts-demo';
  deviceid !:string;
  device !:any;
  sensors !:any;
  listeSensorsAdded : Set<string> = new Set();
  historiqueList:Array<any> = new Array();
  dateList :Set<string> = new Set();
  dataList: Set<number> = new Set();
  groupedData!: any[];

  chart!: Chart;
  startDate !:Date;
  endDate !:Date;
  isLoading: boolean = true;
  offset:number = 0;
  //chartData:any;
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef;
  public constructor(private route:ActivatedRoute,private deviceService:DeviceService,private historiqueService:HistoriqueService,
                     private dataSensorService:DataSensorService){
    route.params.subscribe(params =>this.deviceid = params['id'])
  }


  ngOnInit(): void {
    this.historiqueService.deviceHistorique(this.deviceid,this.offset).subscribe(data => {
      //this.isLoading = true;
      console.log(data);
      this.groupedData = data;
      this.init();
      this.isLoading = false;
      const audio = new Audio('/assets/Sound/wrong.mp3');
      audio.play();


    });
  }

  HistoriqueDate(){
    this.isLoading =true;
    this.chart.destroy();
    this.historiqueService.deviceHistoriquebydate(this.deviceid,this.startDate,this.endDate).subscribe(data => {
      this.groupedData = data;
      this.init();
      this.isLoading=false;
      const audio = new Audio('/assets/Sound/wrong.mp3');
      audio.play();
    });
  }





  init() {
    this.isLoading = true;
    const seriesData = this.groupedData.map(data => {
      let entries = data.series;

      const dates = entries.map((entry: any) => entry.name);
      const values = entries.map((entry: any) => entry.value);
      return {
        name: data.name,
        date: dates,
        data: values
      };
    }).filter(data => data.date.length > 0);

    const chart = new Chart({
      chart: {
        type: 'line',

      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ([] as any[]).concat(...seriesData.map(data => data.date))
      },
      series: seriesData as any[],
      plotOptions:{
        line:{
          lineWidth:3,
          marker:{
            enabled:false,
            symbol:'circle',
            radius:5,
            states:{
              hover:{
                radius:7
              }
            }
          }
        }
      }

    });

    this.chart = chart;
    this.isLoading = false;
    chart.ref$.subscribe(console.log);
  }

  previousPage() {

    if (this.offset > 0) {
      this.offset --;  // Decrease the offset by 10
      this.historiqueService.deviceHistorique(this.deviceid,this.offset).subscribe(data => {
        //this.isLoading = true;
        console.log(data);
        this.groupedData = data;
        this.init();
        this.isLoading = false;
        const audio = new Audio('/assets/Sound/wrong.mp3');
        audio.play();


      });
    }
  }

  nextPage() {
    this.groupedData =[];
    this.isLoading=true;
    this.offset ++;  // Increase the offset by 10
    this.historiqueService.deviceHistorique(this.deviceid,this.offset).subscribe(data => {
      //this.isLoading = true;
      console.log(data);
      this.groupedData = data;
      this.init();
      this.isLoading = false;
      const audio = new Audio('/assets/Sound/wrong.mp3');
      audio.play();


    });
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
