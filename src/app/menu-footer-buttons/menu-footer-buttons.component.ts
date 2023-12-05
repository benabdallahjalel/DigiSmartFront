import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-footer-buttons',
  templateUrl: './menu-footer-buttons.component.html',
  styleUrls: ['./menu-footer-buttons.component.css']
})
export class MenuFooterButtonsComponent implements OnInit {

  selectedLang!:any
  ;
  constructor(){}

  ngOnInit(){
   // this.lang = localStorage.getItem('lang') || 'en' ;  

    this.selectedLang = localStorage.getItem('lang') || 'en' ;   
  }

  changeLang(lang: any){
    
    console.log(lang);
    localStorage.setItem('lang',lang);
    window.location.reload(); 
  }


}
