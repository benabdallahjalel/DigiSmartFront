import { Component } from '@angular/core';
import { Login } from '../request/login';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.css']
})
export class LoginCompComponent {
  login!: Login
  err!: string
  lang : any  =  localStorage.getItem('language') ;
  showAlert = false
  alertMsg = 'Please wait! we are logging you in'
  alertColor = 'bleu'
  inSubmission = false
  visible: boolean = true;
  changetype: boolean = true;
  constructor(private auth: UserService, private userauth: UserAuthService,
    private route: Router, private cookieService: CookieService,private translate : TranslateService) {
    console.log("***********************")
    this.login = new Login();
  }



  submit() {
    console.log("***********************")
    console.log(this.login.email)
    this.showAlert = true
    this.alertMsg = 'Please wait! we are logging you in'
    this.alertColor = 'blue'
    this.inSubmission = true

    this.auth.login(this.login).subscribe((data: any) => {
      // this.userauth.setToken(data.accessToken);
      //   this.userauth.setRoles(data.roles);



      this.cookieService.set('Token', data.accessToken);
      this.cookieService.set('Role', data.roles);
      this.cookieService.set('id', data.id);
      if (data.roles == "ADMIN") {
        console.log("ahla bel admin");
        this.route.navigate(['/home']);
        console.log("ahla bel admin");
      } else if (data.roles == "SUPER_ADMIN") {
        this.route.navigate(['/home']);
        console.log("SUPER ADMIN");
      } else if (data.roles == "CLIENT") {
        this.route.navigate(['/home']);
        console.log("CLIENT");
      }
      this.userauth.setUsername(this.login.email);
      this.userauth.setRoles(data.roles);
      //console.log("role login : "+data.roles);
    },
      (error) => {
        console.log(error.status);
        if (error.status == "401") {
          this.inSubmission = false
          this.alertMsg = 'Invalide credentials '
          this.alertColor = 'danger'
          //this.err = "Invalide credentials"
        } else if (error.status == "404") {
          this.inSubmission = false
          this.alertMsg= 'Adress mail not found'
          this.alertColor = 'danger'
          //this.err = "Adress mail not found"
        } else {
          this.inSubmission = false
          this.alertMsg = 'This account reached max Sessoin'
          this.alertColor = 'danger'
          // this.err = "This account reached max Sessoin"
        }
        ////this.err = "Invalide crd"
      })

  }

  GoToForgetPassword() {
    this.route.navigate(['/forgetpassword'])
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  changeLang(lang: string) {
    this.lang = lang ;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}

