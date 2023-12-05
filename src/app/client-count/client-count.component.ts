import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-client-count',
  template: '<td>{{ clientCount }}</td>',
})
export class ClientCountComponent implements OnInit {
  @Input()
  adminId!: string;
  clientCount: number = 0;

  constructor(private auth: UserService) { }

  ngOnInit(): void {
    this.countClients(this.adminId).subscribe(count => {
      this.clientCount = count;
    });
  }

  countClients(adminId: string) {
    return this.auth.listeClientByAdmin(adminId).pipe(
      map((data: any) => {
        return data.length;
      })
    );
  }
}
