import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-detail-admin',
  templateUrl: './detail-admin.component.html',
  styleUrls: ['./detail-admin.component.css']
})
export class DetailAdminComponent implements OnInit  {
  liste! :any ;
  id ! : any ; 
  user !: any ; 
  isGridView: boolean = false;
  p: number = 1;
  filteredAdminClient : any[] = [];
  search: string = '';

  constructor(private usersService:UserService,private auth: UserService , private router : Router,private cookieService: CookieService,
    private route: ActivatedRoute) {
      // this.route.params.subscribe(params => {
      //   this.id = params['id'];
      //   // Use the 'id' parameter in your component logic
      //   console.log("hello"+this.id);
      // });
      // this.auth.listeClientByAdmin(this.id).subscribe((data: any) => {
       
      //   data.forEach((element: any) => {
      //     console.log(element);
      //   }); 
      //   this.liste = data ; 
      // })
     
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Use the 'id' parameter in your component logic
      console.log("hello"+this.id);
    });
    this.auth.listeClientByAdmin(this.id).subscribe((data: any) => {
       
      data.forEach((element: any) => {
        console.log(element);
      }); 
      this.liste = data ; 
      this.filteredAdminClient = data ;
    })
    this.usersService.DetailsUser(this.id).subscribe(data => {
         
      console.log("reched data");
      
       this.user = data ; 
       console.log(this.user.username);
       
     });
  }

  filterAdminClient() {
    this.filteredAdminClient = this.liste.filter((adminClient:any) => {
      for (let key in adminClient) {
        const value = adminClient[key];
        if (value && value.toString().toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

}
