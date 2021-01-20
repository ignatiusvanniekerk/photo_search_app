import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { world_cities } from 'src/assets/world-cities';
import { City } from 'src/model/City.model';
import * as _ from 'lodash';
import { BaseComponent } from '../base-classes/base-google.component';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent extends BaseComponent{
  
  
  locations: Array<Array<any>> = [[]]

  //////////////////////////////////////////////
  //
  //          CONSTRUCTOR
  //
  //////////////////////////////////////////////
  constructor() { super() }

  //////////////////////////////////////////////
  //
  //          OVERRIDE FUNCTION
  //
  //////////////////////////////////////////////
  async initialize(map:any): Promise<void> {
    this.randomLocations()        
    this.subheading = 'Select the location you would like to see photos of or randize to get 10 new location'
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.locationCard);
    map.setCenter(new google.maps.LatLng(this.selectedLocation.lat,this.selectedLocation.lng));
  }

  /**
   * asks user for location will throw error if declined 
   */
   getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
      }, (error)=>{
        alert('Geolocation permission has been blocked as the user has ignored the permission prompt several times. This can be reset in Page Info which can be accessed by clicking the lock icon next to the URL. See https://www.chromestatus.com/features/6443143280984064 for more information.')
      });
    }
}

  /**
   * saves the selected item to service 
   */
 listChanges(event: City){
  this.googleHelper.selectedLocation = event;
 }

 /**
  * randomized the locations
  */
  randomLocations(){
    this.cityLocations = []
    let i;
    for (i = 0; i < 10; i++) {
      world_cities.length
      let randomNum = Math.floor(Math.random() * 5530) + 1;
      this.cityLocations.push(world_cities[randomNum])
    }    
    return this.cityLocations
  }

  
}


