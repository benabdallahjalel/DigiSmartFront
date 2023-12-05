import { Component, Input } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private service: UserService) { }
  err!: string
  phoneIcon = "fa-phone";
  emailIcon = "fa-envelope";
  placeHoldermail = "Adresse mail";
  placeHolderphone = "Numéro téléphone";
  email!: string;
  PhoneType : string = "phone"; 
  EmailType : string ="mail"; 
  sendCodeReset() {
    this.service.resetpwd(this.email).subscribe();
  }

  TypeReset(type:string){

  }

}
