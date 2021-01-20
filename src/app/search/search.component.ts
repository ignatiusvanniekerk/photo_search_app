import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GoogleApi } from 'src/model/Google-api.model';
import { GoogleApiService } from 'src/services/google-api.service';
import { LOCATION } from 'src/services/google-helper.service';
import { BaseComponent } from '../base-classes/base-google.component';
import { PhotoBoxComponent } from './photo-box/photo-box.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends BaseComponent {

  public autocompleteFormControl = new FormControl('');  
  //////////////////////////////////////////////
  //
  //          CONSTRUCTOR
  //
  //////////////////////////////////////////////
  constructor(public dialog: MatDialog) { super() }

  //////////////////////////////////////////////
  //
  //          OVERRIDE FUNCTION
  //
  //////////////////////////////////////////////
   async initialize(map:any):Promise<void>{     
    this.subheading = "Enter in a location to search for more photos and click on marker"    
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(this.locationCard);    
    await this.setLocation(this.map) 
 }

 /**
  * sets autocomplete to the input
  */
  autoComplete(map: google.maps.Map<HTMLElement>){
    const input = document.getElementById("pac-input") as HTMLInputElement;  
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);  
    autocomplete.addListener("place_changed", async () => await this.autoCompleteLocationChange(autocomplete));
  }
  
  /**
   * when the input is changed and slected to start the prosess again 
   */
  async autoCompleteLocationChange(autocomplete: google.maps.places.Autocomplete){
    this.googleHelper.clearControlePosition(this.map)
    let place: google.maps.places.PlaceResult =autocomplete.getPlace()
    // @ts-ignore
    this.googleHelper.selectedLocation = this.selectedLocation = {name: place.name, lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
    await this.initialize(this.map) 
   }

 
 /**
  * sets the pototions on the map and click opens pic
  * @param map 
  */
 async setLocation(map:any): Promise<void> {  
  let locations:Array<GoogleApi> = await this.googleAPi.nearbySearch(this.selectedLocation.lat, this.selectedLocation.lng)
  this.autocompleteFormControl.setValue(this.selectedLocation.name)
  map.setCenter(new google.maps.LatLng(this.selectedLocation.lat,this.selectedLocation.lng));
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

          let html = `<h4>${locations[i][LOCATION.name]}<a class="float-right" href="/photoDetails/${locations[i].details.reference}" ><button class="mat-focus-indicator mat-button mat-button-base">
          <span class="mat-button-wrapper">
          Details
          </span>
          <span class="mat-ripple mat-button-ripple">
          </span>
          <span class="mat-button-focus-overlay">
          </span>
          </button></a></h4>`
          html +=`<img src="${locations[i][LOCATION.imageUrl]}"/>`
          
            infowindow.setContent(html);
            infowindow.open(map, marker);
        }
    })(marker, i));
  }
}
/**
 * opens dialog with photos of location
 */
openPhotobox(): void{
  const dialogRef = this.dialog.open(PhotoBoxComponent,{
    width: '50%',
      height: '79%',
    data: { result: this.googleHelper.resultState },
  });
}

}
