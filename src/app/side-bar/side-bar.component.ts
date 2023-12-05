import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements AfterViewInit {
 

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cookieService: CookieService
  ) {
    
  }

  
  email = this.cookieService.get("username") ;
  username = this.email.split('@')[0];
  role = this.cookieService.get("roles") ;
 

  ngAfterViewInit() {
    // Initialize the sidebar menu and dropdown functionality
    $(document).ready(() => {
      // Toggle the sidebar menu
      this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {
        const link = $(event.target);
        const closestUl = link.closest('ul');
        const parallelActiveLinks = closestUl.find('.active');
        const closestLi = link.closest('li');
        const linkStatus = closestLi.hasClass('active');
        let count = 0;

        closestUl.find('ul').slideUp(() => {
          if (++count === closestUl.find('ul').length) {
            parallelActiveLinks.removeClass('active');
          }
        });

        if (!linkStatus) {
          closestLi.children('ul').slideDown();
          closestLi.addClass('active');
        } else {
          closestLi.children('ul').slideUp();
          closestLi.removeClass('active');
        }

        // Prevent the click event from bubbling up and closing the dropdown
        event.stopPropagation();
        event.preventDefault();
      });

      // Open the active menu items
      $('.nav.child_menu li.active').parents('ul').slideDown();
    });

    console.log("role !" +this.role)
  }
}
