import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Sensor} from "../request/sensor";
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class SensorService {
requestHeader = new HttpHeaders({"No-Auth":"True"});
  private url="http://localhost:1112/sensor";
  private sensorSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public sensor$: Observable<any> = this.sensorSubject.asObservable();
  constructor(private http:HttpClient) {
  }

  public addSensor(sensor: Sensor): Observable<any> {
    return this.http.post(this.url + "/addSensor", sensor,{responseType:"text"});
  }

  public sensorList():Observable<any>{
    return this.http.get(this.url+"/getAllSensors");
  }
/*
  public sensorDetails(id:string):Observable<any>{
    return this.http.put(this.url+`/updateSensor/${id}`);
  }
*/
  public DeleteSensor(id:string):Observable<any>{
    return this.http.delete(`http://localhost:1112/sensor/deleteSensor/${id}`,{responseType:"text"});
  }

  public Historique():Observable<any>{
    return this.http.get("http://localhost:1112/historique/getHistorique");
  }
  public HistoriquePageable(deviceId:string,page:string):Observable<any>{
    return this.http.get(`http://localhost:1112/historique/loadMoreHistoricDevice/${deviceId}?page=${page}`);
  }
  public HistoriquePpageable(deviceId:string,page:string):Observable<any>{
    return this.http.get(`http://localhost:1112/historique/loaddMoreHistoricDevice/${deviceId}?page=${page}`);
  }


  public DeviceHistorique(id:string):Observable<any>{
    return this.http.get(`http://localhost:1112/historique/findHistoriqueByDevice/${id}`,{headers:this.requestHeader})
  }
  public GetSensorByID(id:string):Observable<any>{
    return this.http.get(this.url+`/getSensorById/${id}`)
  }
}
