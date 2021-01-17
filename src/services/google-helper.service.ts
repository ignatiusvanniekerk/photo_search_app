import { Injectable } from '@angular/core';

export enum LOCATION {
	name = 1,
	latitude,
	longitude,
	marker,
	imageUrl,
} 

@Injectable({
  providedIn: 'root'
})
export class GoogleHelperService {
 
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

   
   autoComplete(
     infowindow: google.maps.InfoWindow, 
     infowindowContent:HTMLElement,
     autocomplete: google.maps.places.Autocomplete, 
     map: google.maps.Map<HTMLElement>, 
     marker: google.maps.Marker){
      infowindow.close();
      marker.setVisible(false);
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
      marker.setVisible(true);
  
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
