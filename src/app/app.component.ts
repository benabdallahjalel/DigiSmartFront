import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showElements: boolean = true;

  constructor(private router: Router,private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        this.showElements = !(event.url === '/login' || event.url === '/forgetpassword'||event.url.startsWith('/newpassword/')
        );
      }
    });

    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      this.translate.use(storedLanguage);
    }
    
  }
}
