import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { world_cities } from 'src/assets/world-cities';
import { City } from 'src/model/City.model';
import { GoogleApiService } from 'src/services/google-api.service';
import { GoogleHelperService, LOCATION } from 'src/services/google-helper.service';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';
import * as _ from 'lodash';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  
  @ViewChild('map') mapElement: any;
  map: google.maps.Map | undefined;
  autocomplete: any = null;
  public cityLocations: Array<City> = [];
  public localStorageUser: string = '';
  public autocompleteFormControl = new FormControl('');
  public selectedLocation: City = new City();
  public marker: any
  public currentState: 'Locations' | 'Search' | 'Favourites' = 'Locations'
  locations: Array<Array<any>> = [[]]
  favLocations: Array<City> = []
  public subheading: string = ''
  // @ts-ignore
  public locationCard: HTMLElement;
  // @ts-ignore
  public navBurrons: HTMLElement;
  constructor(public dialog: MatDialog, 
    private googleAPi: GoogleApiService, 
    private ngZone: NgZone,
    private googleHelper:  GoogleHelperService) { }

  ngOnInit(): void {
    this.randomLocations()    
    // @ts-ignore
    this.favLocations = JSON.parse(localStorage.getItem("favroute")) || [] 
    setTimeout(()=>{
      this.locationCard = document.getElementById("pac-location-card") as HTMLInputElement;
      this.navBurrons = document.getElementById("navigation-buttons") as HTMLInputElement;
      
      this.initGoogleMap(this.googleHelper.map)  
      this.getLocation()
    },0)
    
 }

 getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
     console.log("position", position)
    });
  }
}

 async selectLocation():Promise<void>{ 
    this.currentState = 'Search'
    this.subheading = "Enter in a location to search for more photos"
    // @ts-ignore
    this.googleHelper.map.setCenter(new google.maps.LatLng(this.selectedLocation.lat,this.selectedLocation.lng));
    setTimeout(async ()=>{
      this.clearControlePosition(this.googleHelper.map)
      await this.initialize(this.googleHelper.map) 
    },0) 
 }
 
 async initialize(map:any): Promise<void> {
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(this.locationCard);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.navBurrons);
  let locations = await this.googleAPi.nearbySearch(this.selectedLocation.lat, this.selectedLocation.lng)

  let marker, i;
  let infowindow: google.maps.InfoWindow = new google.maps.InfoWindow();
   
   this.autoComplete(map)
  for (i = 0; i < locations.length; i++) {
      marker = this.googleHelper.mapMarker({
        position: new google.maps.LatLng(locations[i][LOCATION.latitude], locations[i][LOCATION.longitude]),
        map: map,
        icon: locations[i][LOCATION.marker]
    })

      //Create marker functionality, allow infowindow opening
      google.maps.event.addListener(marker, 'click', ((marker, i)=> {
          return function () {

              let html = '<h4>' + locations[i][LOCATION.name] + '</h4>';
              html += '<img src="' + locations[i][LOCATION.imageUrl] + '" />';

              infowindow.setContent(html);
              infowindow.open(map, marker);
          }
      })(marker, i));
  }
}

 
 listChanges(event: City){
   this.selectedLocation = event;
 }

 locationNav(){  
  this.currentState = 'Locations';
  this.randomLocations()
  this.clearControlePosition(this.googleHelper.map)
  this.initGoogleMap(this.googleHelper.map)  
 }

 clearControlePosition(map:any){
   map.controls[google.maps.ControlPosition.TOP_CENTER].clear()
   map.controls[google.maps.ControlPosition.RIGHT_TOP].clear()
   map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear()
 }

 initGoogleMap(map:any): void {
  this.subheading = 'Select the location you would like to see photos of or randize to get 10 new location'
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.navBurrons);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.locationCard);
}
 
autoComplete(map: google.maps.Map<HTMLElement>){
  const input = document.getElementById("pac-input") as HTMLInputElement;  
  const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo("bounds", map);
  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);  
  autocomplete.addListener("place_changed", async () => await this.autoCompleteLocationChange(autocomplete));
}

async autoCompleteLocationChange(autocomplete: google.maps.places.Autocomplete){
  console.log(autocomplete.getPlace())
  let place: google.maps.places.PlaceResult =autocomplete.getPlace()
  // @ts-ignore
  this.selectedLocation = {name: place.name, lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
  await this.selectLocation()
 }
 
  randomLocations(){
    this.cityLocations = []
    let i;
    for (i = 0; i < 10; i++) {
      world_cities.length
      let randomNum = Math.floor(Math.random() * 5530) + 1;
      console.log("world_cities[randomNum] " + world_cities.length, world_cities[randomNum])
      this.cityLocations.push(world_cities[randomNum])
    }    
    return this.cityLocations
  }

  saveToFav(){
    this.favLocations.push(this.selectedLocation)    
    localStorage.setItem("favroute",  JSON.stringify(this.favLocations))
  }

  favoriteCheck(): string {
		return this.favLocations.find((item)=> item.name === this.selectedLocation.name && item.lat === this.selectedLocation.lat && item.lng === this.selectedLocation.lng) ? 'fa fa-star' : 'fa fa-star-o'
  }
  
  favLocation(){
    this.currentState = 'Favourites'
    this.cityLocations =  this.favLocations
    this.subheading = "Your list of Favourite locations"
    this.clearControlePosition(this.googleHelper.map)
    // @ts-ignore
    this.googleHelper.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.navBurrons);
    // @ts-ignore
    this.googleHelper.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(this.locationCard);
    
  }
}


