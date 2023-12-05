import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {UserService} from "../_services/user.service";
import * as L from 'leaflet';
import {HttpClient} from "@angular/common/http";
import {Device} from "../request/device";
import { Sensor } from '../request/sensor';
import { range } from 'rxjs';

import { Directive, HostListener } from '@angular/core';




@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
 
export class AddDeviceComponent implements OnInit {
  title = "google.maps"
  positions: string='hi';
  sensors:any;
  device=new Device();
  lat:any;
  lng:any;
  listAdm:any;
  private map!: L.Map;
  clickedMarker:L.Marker | null = null;
  private centroid: L.LatLngExpression = [34.833, 9.533]; //
  searchQuery : string='' ;
  searchedLocation: L.LatLngExpression | null = null;
  listeSensor : Set<string> = new Set();
  previousCircleLayer: L.Circle | null = null;



  constructor(private router:Router , private service:UserService,private httpclient: HttpClient) {

  }

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 6,
    center: { lat: 34.8333, lng: 9.5333 }
  }

   

  ngOnInit(): void {
    //this.initMap();

    //const provider = new OpenStreetMapProvider();

    this.getSensors();
    this.listAdmin();
  }
  getSensors(){
    this.service.getAllSensors().subscribe(data=>this.sensors=data);
    console.log( this.sensors)

  }
  mapClicked($event: L.LeafletMouseEvent) {
    const latlng = $event.latlng;
    const { lat, lng } = latlng;
    if (this.clickedMarker) {
      // If a marker already exists, remove it from the map
      this.clickedMarker.remove();
    }
    this.clickedMarker = L.marker(latlng)
      .bindPopup(`<b>Clicked Marker: ${lat}, ${lng}</b>`)
      .addTo(this.map)
      .openPopup();
    this.lat=$event.latlng.lat;
    this.lng=$event.latlng.lng;
    console.log($event.latlng.lat, $event.latlng.lng);
  }
  generateMarker(data: any, index: number) {
    return L.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }
  onMapReady($event: L.Map) {
    this.map = $event;
    // this.initMarkers();
  }
  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }
  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }
  getAddress(lat: number, lng: number) {
    const geocoder = (L.Control as any).Geocoder.nominatim();
    return new Promise((resolve, reject) => {
      geocoder.reverse(
        { lat, lng },
        this.map.getZoom(),
        (results: any) => results.length ? resolve(results[0].name) : reject(null)
      );
    })
  }

  verifyadressMac(adress:string){
    const regex = /^([0-9a-fA-F]{2}[:-]?){5}([0-9a-fA-F]{2})$/i;
    return regex.test(adress);

  }
  addDevice(){
    console.log(this.verifyadressMac(this.device.macAdress));
    if(this.verifyadressMac(this.device.macAdress) == false){
      alert("Invalide @ MAC")
    }else if (this.device.idAdmin == null){
      alert("No Admin")
    }else if (this.lat == null){
      alert("NO LOCATION")
    }else if (this.listeSensor == null ) {
      alert("NO SENSOR SELECTED FOR THIS DEVICE")
    }else {
      this.device.lat=this.lat;
      this.device.lng=this.lng;
      this.device.active=false;
      this.device.sensorList = Array.from(this.listeSensor)
      this.service.addDevice(this.device).subscribe();
      this.router.navigate(['devices/liste'])
    }
  }

  listAdmin(){
    this.service.listeAdmin().subscribe(data=>this.listAdm=data)
    console.log(this.listAdm)
  }

  searchLocation() {

    const query = this.searchQuery;
    if (this.previousCircleLayer) {
      this.map.removeLayer(this.previousCircleLayer);
      this.previousCircleLayer = null;
      // Supprimer le marqueur (s'il y en a un)
      if (this.clickedMarker) {
        this.map.removeLayer(this.clickedMarker);
        this.clickedMarker = null;
      }
    }

    if (query) {
      const url =  `https://nominatim.openstreetmap.org/search?q=${query}&format=json&country=${query}`;;
      this.httpclient.get<any[]>(url).subscribe((results) => {
        if (results.length > 0) {
          const location = results[0];
          const { lat, lon } = location;
          const position: L.LatLngExpression = [parseFloat(lat), parseFloat(lon)];
          this.searchedLocation = position;
          this.map.setView(position, 12);
          this.addCircle(position);
        } else {
          console.log('Location not found');
        }
      });
    }
  }
  addCircle(position: L.LatLngExpression) {
    if (this.searchedLocation) {
      if (this.previousCircleLayer) {
        this.map.removeLayer(this.previousCircleLayer);
      }
      const circle = L.circle(position, {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
        radius: 1000  // Set the radius as desired
      }).addTo(this.map);
      const marker = L.marker(position, {
        icon: L.divIcon({
          className: 'custom-marker',
          iconSize: [20, 20],
          html: '<div class="marker-border"></div>'
        })
      }).addTo(this.map);
      this.previousCircleLayer = circle;
    }
  }

  checkedSensor(IDSENSOR:any){

    if(this.listeSensor.has(IDSENSOR)){
      this.listeSensor.delete(IDSENSOR)
    }else{
      this.listeSensor.add(IDSENSOR)
    }
    console.log(this.listeSensor);
    //  this.listeSensor.add(IDSENSOR) ;
    // this.listeSensor.remove(IDSENSOR)
  }


}
