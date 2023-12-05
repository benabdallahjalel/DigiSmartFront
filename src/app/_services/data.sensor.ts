import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
  export class DataSensorService {
    
    private url="http://localhost:1112/dataSensor/";

    constructor(private http:HttpClient){

    }

    DataSensorById(id:string):Observable<any>{
        return this.http.get(this.url+`findDataSensorById/${id}`,{responseType:'json'});
    }
  }