import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error403Component } from './error/error403/error403.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error/error404/error404.component';
import { Error500Component } from './error/error500/error500.component';
import { MainComponent } from './main/main.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { DisplayadminComponent } from './displayadmin/displayadmin.component';
//import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CreateadminComponent } from './createadmin/createadmin.component';
import { CreateclientComponent } from './createclient/createclient.component';
import { DetailAdminComponent } from './detail-admin/detail-admin.component';
import { AuthGuard } from './_auth/auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { DeviceListeComponent } from './device-liste/device-liste.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { AddsensorComponent } from './addsensor/addsensor.component';
import { SensorlistComponent } from "./sensorlist/sensorlist.component";
import {AddDeviceComponent} from "./add-device/add-device.component";
import { HistoriqueComponent } from './historique/historique.component';
import { DeviceService } from './_services/device.service';
import { DeviceupdateComponent } from './deviceupdate/deviceupdate.component';
import { GrapheComponent } from './graphe/graphe.component';
import { DeviceHistoriqueComponent } from './device-historique/device-historique.component';
import {SensorDetailsComponent} from "./sensor-details/sensor-details.component";
import {Home2Component} from "./home2/home2.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //AUTHENTIFICATION
  { path: 'login', component: LoginCompComponent },
  //ADMIN PATH **************
  { path: 'admin', component: DisplayadminComponent },
  { path: 'admin/new', component: CreateadminComponent },
  { path: 'admin/:id', component: DetailAdminComponent },
  // LANDING PAGE
  { path: 'home', component: HomeComponent },
  { path: 'home2', component: Home2Component },
  // CLIENT PATH
  { path: 'client', component: ClientComponent },
  { path: 'client/new', component: CreateclientComponent },
  { path: 'client/:id', component: DetailClientComponent },
  // PASSWORD RECOVRY
  { path: 'forgetpassword', component: ResetPasswordComponent },
  { path: 'newpassword/:code', component: NewpasswordComponent },
  { path: 'forbidden', component: ErrorPageComponent },
  // PROFILING
  { path: 'profile', component: ProfileComponent },
  // DEVICE PATH
  { path: 'devices/liste', component: DeviceListeComponent },
  { path: 'device/add', component: AddDeviceComponent },
  { path: 'device/:id', component: DeviceDetailsComponent },
  { path: 'device/update/:id', component: DeviceupdateComponent},

  { path: 'device/historique/:id', component: DeviceHistoriqueComponent },
  // SENSOR PATH
  { path: 'sensor/add', component: AddsensorComponent },
  { path: 'sensor/liste', component: SensorlistComponent },

  //HISTORIQUE PATH
 
  { path: 'graphe/:id' , component: GrapheComponent},
  { path: 'historique/:id', component: HistoriqueComponent },
  { path: 'SensorDetails/:id', component: SensorDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
