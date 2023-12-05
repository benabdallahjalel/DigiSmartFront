import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Login } from '../request/login';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../request/User';
import {Device} from "../request/device";
import {CookieService} from "ngx-cookie-service";




@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader = new HttpHeaders({ "No-Auth": "True" });
  private url = "http://localhost:1112/";


  constructor(private httpclient: HttpClient,private userAuthService: UserAuthService,private cookieService: CookieService) { }
  public login(login: Login): Observable<any> {
    return this.httpclient.post("http://localhost:1112/api/auth/signin", login, { headers: this.requestHeader })
  }

  public logout(email:string): Observable<any> {
    console.log("session destroyed");
    this.cookieService.set('roles', "x");
    return this.httpclient.post("http://localhost:1112/api/auth/logout",email, { responseType:'text' })
}
/*
  public addAdmin(login:Login):Observable<any>{
    return this.httpclient.post("http://localhost:1112/api/signup/{id}",login,{headers:this.requestHeader})
}*/
  public test():Observable<any>{
    return this.httpclient.get("http://localhost:1112/test",{responseType:"text"});


    return this.httpclient.post("http://localhost:1112/api/auth/destroy", { headers: this.requestHeader })
  }
  /*
    public addAdmin(login:Login):Observable<any>{
      return this.httpclient.post("http://localhost:1112/api/signup/{id}",login,{headers:this.requestHeader})
  }*/
  // public test(): Observable<any> {
  //   return this.httpclient.get("http://localhost:1112/test", { responseType: "text" });
  //
  // }

  public listeAdmin(): Observable<any> {
    return this.httpclient.get("http://localhost:1112/users/ListAdmin", { responseType: "json" });
  }

  public addAdmin(user: User): Observable<any> {
    return this.httpclient.post("http://localhost:1112/users/AddAdmin", user, { responseType: "text" })

  }

  public addClient(user: User, id: string): Observable<any> {
    return this.httpclient.post(`http://localhost:1112/users/AddClient/${id}`, user, { responseType: "text" })

  }


  public listeallClient(): Observable<any> {
    return this.httpclient.get("http://localhost:1112/users/listAllClient", { responseType: "json" });
  }


  public listeClientByAdmin(id: string): Observable<any> {
    return this.httpclient.get(`http://localhost:1112/users/ListClientByAdmin/${id}`, { responseType: "json" });
  }
  public resetpwd(email: string): Observable<any> {


    return this.httpclient.put(`http://localhost:1112/users/resetPwd/${email}`, { responseType: "text" });
  }


  public newpwd(code: string, pwd: string): Observable<any> {
    return this.httpclient.get(`http://localhost:1112/users/verifiePwd/${code}/${pwd}`);
  }


  public sendSMS(phone: string): Observable<any> {
    return this.httpclient.put(`http://localhost:1112/users/sendOtp/${phone}`, { responseType: "text" });
  }

  public DetailsUser(id: string): Observable<any> {
    // console.log(this.httpclient.get(`ttp://localhost:1112/users/${id}`,{responseType:"json"}))
    return this.httpclient.get(`http://localhost:1112/users/${id}`, { responseType: "json" });
  }
  public getAllSensors(): Observable<any> {
    return this.httpclient.get(this.url + `sensor/getAllSensors`, { responseType: "json" });
  }
  public addDevice(device: Device): Observable<any> {
    return this.httpclient.post(this.url + `devices/addDevice`, device, { responseType: "text" });
  }


  public UpdateUserData(id: string, user: User): Observable<any> {
    return this.httpclient.put(`http://localhost:1112/users/updateuser/${id}`, user, { responseType: "text" });
  }

  deleteClient(id: string, role: any): Observable<any> {
    const url = `http://localhost:1112/users/deleteuser/${id}`;
    console.log("role to delete: " + role);
    
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userAuthService.getToken());
      return this.httpclient.delete(url, { headers }).pipe(
        tap((response: any) => {
          console.log('User deleted successfully:', response);
        }),
        catchError((error: any) => {
          console.error('Error while deleting client:', error);
          return of(error);
        })
      );
    
  }




  public roleMatch(allowedRoles: any) {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    //console.log(allowedRoles);
    //console.log(userRoles);
    if (userRoles != null) {
      //console.log("test")
      //for(let i=0;i<userRoles.length;i++){
      //console.log(userRoles.length)
      for (let j = 0; allowedRoles.length; j++) {
        // console.log(allowedRoles[j])
        if (userRoles === allowedRoles[j]) {
          // console.log("true");
          isMatch = true;

          return isMatch;
        } else {
          // console.log("false1")
          return isMatch;
        }
      }
    }
    //}
    // console.log("false");
    return isMatch;
  }

}
