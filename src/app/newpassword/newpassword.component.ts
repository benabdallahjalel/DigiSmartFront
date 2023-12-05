
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {
  constructor(  private service:UserService,private http:HttpClient,private actRoute:ActivatedRoute){}
  code!:string;
  pwd!:string;
  ngOnInit() {
    this.code=this.actRoute.snapshot.params['code'];
    console.log(this.code)
    };
  

 

  updatePassword(){
    this.service.newpwd(this.code,this.pwd).subscribe();
   // this.route.navigate(["/login"])
  }
}
