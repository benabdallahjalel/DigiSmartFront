import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  

  requestHeader = new HttpHeaders({"No-Auth":"True"});
  private url = "http://localhost:1112/historique";
  private url2 = "http://localhost:1112/devices";
  private url3 = "http://localhost:1112/dataSensor";
  constructor(private http: HttpClient ) { }

  public Historique(id:string):Observable<any>{
    return this.http.get(this.url + `/findHistoriqueByDevice/${id}`);
  }
  public ListSensor(id:string):Observable<any>{
    return this.http.get(this.url2 + `/getSensorList/${id}`)
  }
  public HistoriqueBySensorAndDevice(idS:string,idD:string):Observable<any>{
    return this.http.get(this.url + `/findHistoriqueByDeviceAndSensor/${idD}/${idS}`)
}
  public findDataSensorByDeviceAndSensor(idS:string,idD:string):Observable<string>{
    return this.http.get(this.url3 + `/DataId/${idS}/${idD}`,{responseType:"text"})
  }
  public generateDataSensorHistoriquePdf (id:string):Observable<HttpResponse<Blob>>{
    return this.http.get(this.url3 + `/generateDataSensorHistoriquePdf/${id}`, { responseType: 'blob',
      observe: 'response'})
  }
  public generateDeviceHistoriquePdf (id:string, startDate: Date, endDate: Date):Observable<HttpResponse<Blob>>{
    const convertedStartDate = new Date(startDate);
    const convertedEndDate = new Date(endDate);
    const params = {
      startDate: convertedStartDate.toISOString().split('T')[0],
      endDate: convertedEndDate.toISOString().split('T')[0]
    };
    return this.http.get(this.url + `/generateDeviceHistoriquePdf/${id}`, { params, responseType: 'blob', observe: 'response' })
  }
  public exportDataToCSV (deviceId: string, startDate: string, endDate: string):Observable<Object>{
    return this.http.get(this.url + `/exportToCSV/${deviceId}?startDate=${startDate}%3A00&endDate=${endDate}%3A00`)
  }
  getHistoriqueDevice(page: number, pageSize: number): Observable<any[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any[]>(`${this.url}/loadMore`, { params });
  }

  getHistoriqueByDevice(deviceId: string, page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.url}/loadMoreHistoricDevice/${deviceId}`, { params });
  }

  SensorHistorique(iddevice:string,idsensor:string):Observable<any>{
    return this.http.get(this.url+`/findHistoriqueByDeviceAndSensor/${iddevice}/${idsensor}`,{responseType:'json'})
}

deviceHistorique(id:string,offset:number):Observable<any>{
    return this.http.get<any[]>(this.url+`/device/${id}/${offset}/${100}`,{responseType:'json'})
}

deviceHistoriquebydate(id:string,start:Date,fin:Date):Observable<any>{
  return this.http.get<any[]>(this.url+`/device1/${id}/${start}/${fin}`,{responseType:'json'})
}
}
