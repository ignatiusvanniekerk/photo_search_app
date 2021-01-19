import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { world_cities } from 'src/assets/world-cities';
import { City } from 'src/model/City.model';
import { GoogleApiService } from 'src/services/google-api.service';
import { GoogleHelperService, LOCATION } from 'src/services/google-helper.service';
import * as _ from 'lodash';
import { MapsAPILoader } from '@agm/core';
import { BaseComponent } from '../base-classes/base-google.component';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent extends BaseComponent{
  
  
  locations: Array<Array<any>> = [[]]

  constructor() {
      super()
     }

  
  async initialize(map:any): Promise<void> {
    this.randomLocations()        
    this.subheading = 'Select the location you would like to see photos of or randize to get 10 new location'
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.locationCard);
  }

 getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
       console.log("position", position)
      }, (error)=>{
        alert('Geolocation permission has been blocked as the user has ignored the permission prompt several times. This can be reset in Page Info which can be accessed by clicking the lock icon next to the URL. See https://www.chromestatus.com/features/6443143280984064 for more information.')
      });
    }
}
 
 listChanges(event: City){
   this.selectedLocation = event;
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


