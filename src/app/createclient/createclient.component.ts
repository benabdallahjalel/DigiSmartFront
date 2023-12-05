import { Component, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../request/User';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-createclient',
  templateUrl: './createclient.component.html',
  styleUrls: ['./createclient.component.css']
})
export class CreateclientComponent {
  liste! : any 
  user = new User();
  selectAdmin: any = '';
  successAlertVisible = false;
  errorAlertVisible = false;
  passwordMismatch: boolean = false;
  @ViewChild('form', { static: true }) form!: NgForm;

 

  constructor(private auth: UserService , private router : Router,private cookieService: CookieService) {
    
  
  }

  ngOnInit(){
    this.auth.listeAdmin().subscribe((data: any) => {
      //console.log("data is here-----------");
      data.forEach((element: any) => {
        console.log("WAAAAAAAAAAAAA : \n"+element.username) ;
        //console.log();
      }); 
      this.liste = data ;
      
    })
  }
  role = this.cookieService.get("Role") ;

  CreateClient() {
    console.log(this.user)
    if (this.role === 'ADMIN') {
      this.auth.addClient(this.user, this.cookieService.get("id")).subscribe(
        (response: any) => {
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          this.successAlertVisible = false;
          this.errorAlertVisible = true;
                  });
    
    } else {

console.log(this.user)
      this.auth.addClient(this.user, this.selectAdmin).subscribe(
        (response: any) => {
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          this.successAlertVisible = false;
          this.errorAlertVisible = true;
        }
        );
      }
  }
  
 
  
  closeSuccessAlert() {
    this.successAlertVisible = false;
    window.location.reload();
  }

  closeErrorAlert() {
    this.errorAlertVisible = false;
    window.location.reload();
  }

  checkPasswordMatch(password: string, confirmPassword: string): void {
    this.passwordMismatch = password !== confirmPassword;
  }

  isPasswordComplex(password: string): boolean {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    return uppercaseRegex.test(password) && numberRegex.test(password);
  }
    
  }

