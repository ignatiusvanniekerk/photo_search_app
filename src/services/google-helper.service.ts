import { Injectable } from '@angular/core';
import { City } from 'src/model/City.model';

export enum LOCATION {
	name = 'name',
	latitude = 'lat',
	longitude = 'lng',
	marker = 'pin',
	imageUrl ='photoUrl',
} 

@Injectable({
  providedIn: 'root'
})
export class GoogleHelperService {
  public selectedLocation: City = new City(); 
  constructor() { }

  initMap(lat: number, lng: number, zoom: number, mapElement: HTMLElement): google.maps.Map<HTMLElement>{
    return  new google.maps.Map(
      mapElement,
      {
        center: { lat: lat, lng: lng },
        zoom: zoom,
        streetViewControl: false,
      }      
    );
   }

   mapMarker(markerDetails: google.maps.ReadonlyMarkerOptions | undefined): google.maps.Marker{
   return new google.maps.Marker(markerDetails);
   }

   clearControlePosition(map:any):void{
    map.controls[google.maps.ControlPosition.TOP_CENTER].clear()
    map.controls[google.maps.ControlPosition.RIGHT_TOP].clear()
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear()
  }
   autoComplete(
     infowindow: google.maps.InfoWindow, 
     infowindowContent:HTMLElement,
     autocomplete: google.maps.places.Autocomplete, 
     map: google.maps.Map<HTMLElement>, 
     marker: google.maps.Marker):void{
      infowindow.close();
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
  
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
      }
      
      marker.setPosition(place.geometry.location);
      
  
      let address = "";
  
      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            "",
        ].join(" ");
      }
      // @ts-ignore
      infowindowContent.children["place-icon"].src = place.icon;
      // @ts-ignore
      infowindowContent.children["place-name"].textContent = place.name;
      // @ts-ignore
      infowindowContent.children["place-address"].textContent = address;
      infowindow.open(map, marker);
    }

}
