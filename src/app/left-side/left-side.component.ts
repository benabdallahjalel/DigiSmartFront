import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent {
  constructor(  private route: Router, private cookieService: CookieService) {
    console.log("***********************")
  
  }
  role = this.cookieService.get("Role") ;

  GoToHomePage()    {this.route.navigate(['/home'])}
  GoToAdminPage()   {
    console.log("ROLE"+this.role); 

    if(this.role == "SUPER_ADMIN"){
      this.route.navigate(['/admin'])
    }else if (this.role == "ADMIN" || this.role == "CLIENT") {
      this.route.navigate(['/home'])
    }else{
      this.route.navigate(['/login'])
    }
  }
  GoToClientPage()  {this.route.navigate(['/client'])}
  
}
