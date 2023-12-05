import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { error } from 'jquery';

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.css']
})
export class MultiStepFormComponent {
  currentStep: number = 1;
  email !: string;
  errorCode !: string ; 
  successCode !: string ; 
  PhoneTxt !: string;
  codeSendedInMail !: any;
  codeInInput !: any;
  @Input() icon!: string;
  @Input() placeHolder!: string;
  @Input() type!: string;
  password !: string;
  isDisabled: boolean = false;
  isDisabledNext: boolean = false;
  disabledCode : boolean = true ; 
  visible: boolean = true;
  changetype: boolean = true;
  visible1: boolean = true;
  changetype1: boolean = true;
  constructor(private router: Router, private service: UserService, private http: HttpClient) {
    console.log(this.placeHolder)

  }
  goToNextStep() {
    console.log("current step" + this.currentStep);

    if (this.currentStep == 1) {
      if (this.type == "phone") {
        this.service.sendSMS(this.PhoneTxt).subscribe(
          data => { 
           
            this.disabledCode = false ; 
            this.codeSendedInMail = data.message; 
            console.log("after 1s"+this.codeSendedInMail);},
          error => { console.error(error); }); 
      } else { 
       
        this.service.resetpwd(this.email).subscribe(

          data => {
            this.disabledCode = false ; 
            this.codeSendedInMail = data.message;});
      }
      console.log("after 2s"+this.codeSendedInMail);
      this.isDisabled = true;
      this.isDisabledNext = true;
    } else if (this.currentStep == 2) {
      
      console.log("CODE insreted" + this.codeInInput);
    } else { 
      this.service.newpwd(this.codeInInput, this.password).subscribe( 
        (error) => {
          console.error(error);
        }
      );
      this.router.navigate(['/login']).then(()=>{window.location.href='http://localhost:4200/login'})
    }
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    console.log("current step" + this.currentStep);
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  verifyCode() {
    console.log("after 3s"+this.codeSendedInMail);
    if (this.codeSendedInMail == this.codeInInput) {
      this.isDisabledNext = false;
      this.successCode = "Code Matched Successfully "
      this.errorCode = "" ;  
    }else{
      this.errorCode = "Code MisMatch Try Again" ; 
      this.successCode = ""
    }
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  viewpass1() {
    this.visible1 = !this.visible1;
    this.changetype1 = !this.changetype1;
  }

}
