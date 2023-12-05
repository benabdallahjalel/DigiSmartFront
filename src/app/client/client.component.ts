import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  liste: any[] = [];
  p: number = 1;
  search: string = '';
  filteredClients: any[] = [];
  successAlertVisible = false;
  errorAlertVisible = false;
  isGridView: boolean = false;
  message: string = "WAITING FOR DATA ";

  constructor(private auth: UserService, private router: Router, private cookieService: CookieService) {
    //  console.log("test");
    if (cookieService.get("Role") == "ADMIN") {
      console.log("he is admin");
      this.auth.listeClientByAdmin(cookieService.get("id")).subscribe((data: any) => {
        // console.log("data is here-----------");
        data.forEach((element: any) => {
          //console.log(element);
        });

        this.filteredClients = data;
      })
    } else {
      console.log("SUPER ADMIN CLIENT");

      //
      this.auth.listeallClient().subscribe((data: any) => {
        //console.log("data is here-----------");
        data.forEach((element: any) => {
          console.log(element);
        });



        this.liste = data;
        this.filteredClients = data;
        this.DataLoaded() ;
      })
    }


  }

  role = this.cookieService.get("Role");
  GoToCreateClient() {
    this.router.navigate(['/client/new']);
  }

  GoTOClientDetails(id: any) {
    this.router.navigate(['/client/' + id]);
  }
  filterClients() {
    this.filteredClients = this.liste.filter((client) => {
      for (let key in client) {
        const value = client[key];
        if (value && value.toString().toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  delete(id: any) {
    if (confirm("Voulez-vous vraiment supprimer ce client ?")) {
      const role = this.cookieService.get("Role");
      this.auth.deleteClient(id, role).subscribe(
        (response: any) => {
          console.log('Client deleted successfully:', response);
          this.errorAlertVisible = false;
          this.successAlertVisible = true;
        },
        (error: any) => {
          console.error('Error while deleting client:', error);
          console.log('Response body:', error?.error);
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


  DataLoaded(){
    this.message ="DataLoaded";
  }






}
