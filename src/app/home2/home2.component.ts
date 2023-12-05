import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import {SensorService} from "../_services/sensor.service";
import {DeviceService} from "../_services/device.service";
import {CookieService} from "ngx-cookie-service";

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements AfterViewInit,OnInit {
  listSensor:any;
  listDevice !:any;
constructor(private sv:SensorService , private dv:DeviceService,private cookieService: CookieService,) {
}
  ngOnInit() {
    this.dv.AdminDeviceList(this.cookieService.get('id')).subscribe((data:any)=>{
      this.listDevice = data;
      console.log(this.listDevice);
      // for ( device of this.listDevice){
      //   this.createChartGauge(device.id);
      //   console.log("ok")
      // }
      console.log(this.cookieService.get('Role'))});
  }
public ngAfterViewInit(): void {
  this.createChartGauge();
    this.createChartPie();
    this.createChartColumn();
    this.createChartLine();
  }
  private createCharts(): void {
    console.log("ok")
    for (const device of this.listDevice){
      this.createChartGauge();
      console.log("ok")
    }
    this.listDevice.forEach((device:any) => {
      this.createChartGauge();

    });
  }
private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

private createChartGauge(): void {
    const chart = Highcharts.chart('chart-gauge', {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: 'Gauge Chart',
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '30%'],
        size: '50%',
        background: {
          innerRadius: '10%',
          outerRadius: '10%',
          shape: 'arc',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        name: null,
        data:  [this.getRandomNumber(0, 100)],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span></div>',
        },
      }],
    } as any);

    setInterval(() => {
    chart.series[0].points[0].update(this.getRandomNumber(0, 100));
  }, 1000);
}

private createChartPie(): void {
    let date = new Date();
    const data: any[] = [];

  for (let i = 0; i < 5; i++) {
    date.setDate(new Date().getDate() + i);
    data.push({
      name: `${date.getDate()}/${date.getMonth() + 1}`,
      y: this.getRandomNumber(0, 1000),
    });
  }

  const chart = Highcharts.chart('chart-pie', {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Pie Chart',
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: `<span class="mb-2">Date: {point.key}</span><br>`,
      pointFormat: '<span>Amount: {point.y}</span>',
      useHTML: true,
    },
    series: [{
      name: null,
      innerSize: '50%',
      data,
    }],
  } as any);

  setInterval(() => {
    date.setDate(date.getDate() + 1);
    chart.series[0].addPoint({
      name: `${date.getDate()}/${date.getMonth() + 1}`,
      y: this.getRandomNumber(0, 1000),
    }, true, true);
  }, 1500);
}

private createChartColumn(): void {
    let date = new Date();
    const data: any[] = [];

  for (let i = 0; i < 10; i++) {
    date.setDate(new Date().getDate() + i);
    data.push({
      name: `${date.getDate()}/${date.getMonth() + 1}`,
      y: this.getRandomNumber(0, 1000),
    });
  }

  const chart = Highcharts.chart('chart-column' as any, {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Column Chart',
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      title: undefined,
    },
    xAxis: {
      type: 'category',
    },
    tooltip: {
      headerFormat: `<div>Date: {point.key}</div>`,
      pointFormat: `<div>{series.name}: {point.y}</div>`,
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [{
      name: 'Amount',
      data,
    }],
  } as any);

  setInterval(() => {
    date.setDate(date.getDate() + 1);
    chart.series[0].addPoint({
      name: `${date.getDate()}/${date.getMonth() + 1}`,
      y: this.getRandomNumber(0, 1000),
    }, true, true);
  }, 1500);
}

private createChartLine(): void {
    let date = new Date();
    const data: any[] = [];

  for (let i = 0; i < 10; i++) {
    date.setDate(new Date().getDate() + i);
    data.push([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)]);
  }

  const chart = Highcharts.chart('chart-line', {
    chart: {
      type: 'line',
      zoomType:"x",
    },
    title: {
      text: 'Line Chart',
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: null,
      }
    },
    xAxis: {
      type: 'category',
    },
    tooltip: {
      headerFormat: `<div>Date: {point.key}</div>`,
      pointFormat: `<div>{series.name}: {point.y}</div>`,
      shared: true,
      useHTML: true,
    },
    series: [{
      name: 'Amount',
      data,
    }],
  } as any);

  setInterval(() => {
    date.setDate(date.getDate() + 1);
    chart.series[0].addPoint([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)], true, true);
  }, 1500);
}



}

