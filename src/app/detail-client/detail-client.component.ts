import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {
  id!: string;
  usera!: any;
  constructor(private usersService: UserService, private router: Router, private cookieService: CookieService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);

    });
    this.usersService.DetailsUser(this.id).subscribe(data => {

      console.log("reched data");

      this.usera = data;
      console.log(this.usera.username);

    });
  }

  ngOnInit(): void {

  }

}