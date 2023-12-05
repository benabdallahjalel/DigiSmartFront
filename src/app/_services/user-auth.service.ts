import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private cookieService: CookieService) { }

  public getid(){
    return this.cookieService.get('id');
  }

  public setid(id:string){
    this.cookieService.set('id',id);
  }

  public setRoles(roles:[]){
   // localStorage.setItem('roles', JSON.stringify(roles));
   this.cookieService.set('roles', JSON.stringify(roles));

  }
/*
  public getRoles():string{
    //return localStorage.getItem("roles");
    return this.cookieService.get('roles');
  }*/

  public getRoles(): string[] {
  const rolesCookie = this.cookieService.get('Role');
  let roles: string[] = [];

  try {
    roles = JSON.parse(rolesCookie);
  } catch (error) {
    console.error(`Error parsing roles cookie: ${error}`);
  }

  return roles;
}

  public setToken(jwtToken:string){
    //localStorage.setItem('jwtToken', jwtToken);
   this.cookieService.set('jwtToken', jwtToken);
  }

  public getToken(){
    //return localStorage.getItem('jwtToken');
    
    return this.cookieService.get('jwtToken');
  }

  public clear(){
    this.cookieService.delete('roles')
    this.cookieService.delete('jwtToken');
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

   public setUsername(username: string) {
    this.cookieService.set('username', username);
  }

  public getUsername(): string {
    return this.cookieService.get('username');
  }


}
