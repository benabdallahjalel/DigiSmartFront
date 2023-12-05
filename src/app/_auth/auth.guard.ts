import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userAuthService:UserAuthService,private router:Router,
    private userService:UserService,private cookieService:CookieService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token : string = this.cookieService.get("Token");
      console.log(token);
    if(token != ""){
  
      console.log("token valid");
      const role = route.data['roles'] as Array<string>;
      console.log(role);
      if(role != null){
        for(let r of role){
          const match = this.userService.roleMatch(r)
          if(match){
            return true;
          }
        }
        const match = this.userService.roleMatch(role);
        const role1 : any =this.userAuthService.getRoles();
        console.log(role1);
        //console.log(match);
        //console.log(role[0] === role1);
        //const bool = (role[0]===role)

        if (match){
          console.log("same role");
          return true;
        }  else {
          console.log("different role");
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
        
    }else{
      console.log("no token");
      this.router.navigate(['/login']);
      return false;
    }
  
  
  console.log("init")
   
  this.router.navigate(['/login']);
    return false;
}

  
}