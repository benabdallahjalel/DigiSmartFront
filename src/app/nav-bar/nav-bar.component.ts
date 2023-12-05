import { UserService } from './../_services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import $ from 'jquery';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {



  constructor(
    private route: Router, private cookieService: CookieService , 
    private userS : UserService) {
    
  }

  ngOnInit() {
    $(document).ready(function() {
      // Toggle sidebar
      $('#menu_toggle').click(function() {
        $('body').toggleClass('nav-md nav-sm');
      });
    });
  
    $(document).ready(() => {
      // Toggle the sidebar menu
      $('.nav.side-menu li a').click(() => {
        var link = $(this);
        var closestUl = link.closest('ul');
        var parallelActiveLinks = closestUl.find('.active');
        var closestLi = link.closest('li');
        var linkStatus = closestLi.hasClass('active');
        var count = 0;
  
        closestUl.find('ul').slideUp(function() {
          if (++count == closestUl.find('ul').length)
            parallelActiveLinks.removeClass('active');
        });
  
        if (!linkStatus) {
          closestLi.children('ul').slideDown();
          closestLi.addClass('active');
        }
      });
  
      // Open the active menu items
      $('.nav.child_menu li.active').children('ul').slideDown();
    });
  }

  
  logout() {
    console.log("LOGOUT")
    this.cookieService.delete('Role');
    this.cookieService.delete('Token');
    console.log("hell");
    
    //this.userS.logout() ; 
    this.route.navigate(['/login'])
  }
}
