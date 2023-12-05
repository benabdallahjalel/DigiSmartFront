import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAuthService } from "./user-auth.service";
import { Observable } from "rxjs";
import { Device } from "../request/device";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
  })

  export class DeviceService {
    requestHeader = new HttpHeaders({"No-Auth":"True"});
    private url = "http://localhost:1112/";
    constructor(private httpclient: HttpClient ,private cookie:CookieService) { }


    public DeviceListe():Observable<any>{
        return this.httpclient.get("http://localhost:1112/devices/getAllDevices",{headers:this.requestHeader})
    }


    public DeviceDetails(id:any):Observable<any>{
      return this.httpclient.get(`http://localhost:1112/devices/getDeviceId/${id}`,{headers:this.requestHeader})
    }

    public DeviceSensor(id:any):Observable<any>{
      return this.httpclient.get(`http://localhost:1112/devices/getSensorList/${id}`,{headers:this.requestHeader})
    }
    public AdminDeviceList(id:any):Observable<any>{
      return this.httpclient.get(`http://localhost:1112/devices/getAdminDevices/${id}`,{headers:this.requestHeader})
    } 

    public DeviceById(id:string):Observable<any>{
      return this.httpclient.get(`http://localhost:1112/devices/getDeviceId/${id}`,{responseType:'json'});
    }
    public updateDevice(id:string,device:Device):Observable<any>{
      return this.httpclient.put(`http://localhost:1112/devices/updateDevice/${id}`,device,{responseType:'text'});
    }

    public DeviceStatus(id:string):Observable<any>{
      return this.httpclient.put(`http://localhost:1112/devices/setDeviceState/${id}`,{responseType:'text'});
    }

    clientDevice():Observable<any>{
      return this.httpclient.get(`http://localhost:1112/devices/getClientDevices/${this.cookie.get('id')}`,{responseType:'json'});
    }

    affectedDevice(idDevice:string,idClient:string):Observable<any>{
      return this.httpclient.put(`http://localhost:1112/devices/affectToClient/${idDevice}`,idClient,{responseType:'text'});
    }
  }