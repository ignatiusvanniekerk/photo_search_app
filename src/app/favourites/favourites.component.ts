import { Component, OnInit } from '@angular/core';
import { City } from 'src/model/City.model';
import { BaseComponent } from '../base-classes/base-google.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent extends BaseComponent {

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
    this.cityLocations =  this.favLocations
    this.subheading = "Your list of Favourite locations"
    this.googleHelper.clearControlePosition(this.map)    
    // @ts-ignore
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(this.locationCard);
    map.setCenter(new google.maps.LatLng(this.selectedLocation.lat,this.selectedLocation.lng));
    
  }
 
  /**
   * saves the selected item to service 
   */
  listChanges(event: City){
    this.googleHelper.selectedLocation = this.selectedLocation = event;
  }
}
