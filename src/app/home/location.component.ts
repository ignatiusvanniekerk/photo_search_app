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
  public emailFormControl = new FormControl('');
  public selectedLocation: City = new City();
  public marker: any
  public currentState: 'Locations' | 'Search' | 'Favourites' = 'Locations'
  locations: Array<Array<any>> = [[]]
  public subheading: string = 'Select the location you would like to see photos of or randize to get 10 new location'
  public infowindow: google.maps.InfoWindow = new google.maps.InfoWindow();
  public infowindowContent: HTMLElement = document.getElementById(
     "infowindow-content"
   ) as HTMLElement;
  constructor(public dialog: MatDialog, 
    private googleAPi: GoogleApiService, 
    private ngZone: NgZone,
    private googleHelper:  GoogleHelperService) { }

  ngOnInit(): void {
    this.randomLocations()
    this.map = this.googleHelper.initMap(-33.8688,151.2195, 13,  document.getElementById("map") as HTMLInputElement )
    setTimeout(()=>{
      this.initGoogleMap(this.map)  
    },0)
    
 }
 async selectLocation(){ 
    this.currentState = 'Search'
    // @ts-ignore
    this.map.setCenter(new google.maps.LatLng(this.selectedLocation.lat,this.selectedLocation.lng));
    // const map = this.googleHelper.initMap(this.selectedLocation.lat,this.selectedLocation.lng, 16, document.getElementById("map") as HTMLInputElement)
    setTimeout(async ()=>{
      await this.initialize(this.map) 
    },0)
  
 
 }

 async initialize(map:any) {
  //Get mapArea in HTML, create map based around latlong
 
  const navBurrons = document.getElementById("navigation-buttons") as HTMLInputElement;
  const locationCard = document.getElementById("pac-location-card") as HTMLInputElement;
  map.controls[google.maps.ControlPosition.TOP_CENTER].clear();
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(locationCard);
  console.log(map.controls)
  // map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(navBurrons);
  let locations = await this.googleAPi.nearbySearch(this.selectedLocation.lat, this.selectedLocation.lng)

  let marker, i;

  let infowindow = this.infowindow

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

              // infowindow.setContent(html);
              // infowindow.open(map, marker);
          }
      })(marker, i));
  }
}

 
 listChanges(event: City){
   this.selectedLocation = event;
 }

 initGoogleMap(map:any): void {
  

  const input = document.getElementById("pac-input") as HTMLInputElement;
  const navBurrons = document.getElementById("navigation-buttons") as HTMLInputElement;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(navBurrons);

  const locationCard = document.getElementById("pac-location-card") as HTMLInputElement;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationCard);
  let marker = this.googleHelper.mapMarker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  })
  
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);
  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
  autocomplete.addListener("place_changed", () => this.googleHelper.autoComplete(this.infowindow, this.infowindowContent, autocomplete, map, marker));

}



openDialog() {
    console.log(`Dialog openDialog:`);
    const dialogRef = this.dialog.open(HomeDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
}


