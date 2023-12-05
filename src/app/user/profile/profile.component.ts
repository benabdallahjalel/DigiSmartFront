import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user !: any ; 
  myForm!: FormGroup ;
  constructor(
    private route: Router, private cookieService: CookieService , 
    private userservice : UserService) {

     this.userservice.DetailsUser(this.cookieService.get('id')).subscribe(
      data => {this.user = data ;
      console.log(data);}
      )
    
  }
  verifyPhoneNumber(phone:string){
    const regex = /^([0-9]{1}){8}$/i;
    return regex.test(phone);

  }
   UpdateUserData(){ 
    console.log(this.user);
    if(this.verifyPhoneNumber(this.user.telephone) == false )
    {
      alert("Invalide Phone Number")
    }else{
      this.userservice.UpdateUserData(this.user.id , this.user).subscribe(data => 
        console.log("User Updated successfully")
        )
        alert("User updated Successfully")
    }
    
  }

  email = this.cookieService.get("username") ;
  username = this.email.split('@')[0];



}
