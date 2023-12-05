import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import $ from 'jquery';
import { UserService } from '../_services/user.service';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  role = this.cookieService.get("roles") ;
  lang : any  =  localStorage.getItem('language') ;

  constructor(
    private route: Router, private cookieService: CookieService,
    private userS : UserService,
    private translate : TranslateService) {


  }

    username = this.cookieService.get("username") ;

  ngOnInit() {
    $(document).ready(function() {
      // Toggle sidebar
      $('#menu_toggle').click(function() {
        $('body').toggleClass('nav-md nav-sm');
      });
    });


  }



  logout() {
    console.log("LOGOUT")
    this.userS.logout(this.cookieService.get('username')).subscribe() ;
    this.cookieService.delete('Role');
    this.cookieService.delete('Token');
  
    this.route.navigate(['/login'])
  }

  changeLang(lang: string) {
    this.lang = lang ;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

}
