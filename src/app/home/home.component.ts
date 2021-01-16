import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { world_cities } from 'src/assets/world-cities';
import { FlickrApiService } from 'src/services/flickr-api.service';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public localStorageUser: string = '';
  @ViewChild('map') mapElement: any;
  map: google.maps.Map | undefined;
  autocomplete: any = null
  public emailFormControl = new FormControl('');
  constructor(public dialog: MatDialog, private flicAPIService: FlickrApiService, private ngZone: NgZone, ) { }

  //  ngOnInit(): void {
  //   this.localStorageUser = localStorage.getItem('pic-a-place-user') || "";
    
  //   if(!this.localStorageUser){
  //     this.openDialog()
  //   }
  // }
  ngOnInit(): void {
    console.log("this.item 59056", world_cities.length)
    
    this.emailFormControl.valueChanges.subscribe((item)=>{

      
      // this.autoComplete()
    })
    setTimeout(()=>{
      this.initMap()  
    },0)
    
 }
 initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
    }
  );
  const card = document.getElementById("pac-card") as HTMLElement;
  const input = document.getElementById("pac-input") as HTMLInputElement;

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(card);

  const autocomplete = new google.maps.places.Autocomplete(input);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById(
    "infowindow-content"
  ) as HTMLElement;
  infowindow.setContent(infowindowContent);
  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();
    console.log('place', place)
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
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
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id: any, types: any) {
    const radioButton = document.getElementById(id) as HTMLInputElement;
    radioButton.addEventListener("click", () => {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener("changetype-all", []);
  setupClickListener("changetype-address", ["address"]);
  setupClickListener("changetype-establishment", ["establishment"]);
  setupClickListener("changetype-geocode", ["geocode"]);

  (document.getElementById(
    "use-strict-bounds"
  ) as HTMLInputElement).addEventListener("click", function () {
    console.log("Checkbox clicked! New state=" + this.checked);
    autocomplete.setOptions({ strictBounds: this.checked });
  });
}
// autoComplete(){
//   var input:any = document.getElementById('autocompleteInput') as HTMLInputElement;
//   console.log('input', input)
  
//   this.autocomplete = new google.maps.places.Autocomplete(input)
//   const inputs = document.getElementById("pac-input") as HTMLInputElement;
//   this.autocomplete.addListener('place_changed', () => {
//     this.ngZone.run(() => {
//       // infowindow.close()

//       var place = this.autocomplete.getPlace()
//       console.log('place', place)
//       console.log('this.autocomplete', this.autocomplete)
//       var changedMarkerPosition = {
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       }
//       console.log("changedMarkerPosition", changedMarkerPosition)
//       // if (this.showMap) {
//       //   var map = this.loadMap(changedMarkerPosition)
//       // }

//       // var marker = this.markerDisplay(changedMarkerPosition, map)

//       // // Set UI values
//       // this.data.addressLocation = place.formatted_address
//       // this.data.gpsCoordinates = place.geometry.location.lat() + ',' + place.geometry.location.lng()

//       // let postalCodePart = place.address_components.find((comp) => _.includes(comp.types, 'postal_code'))
//       // this.data.postalCode = postalCodePart ? postalCodePart.longName : ''
//       // this.data.address1 = ''
//       // this.data.address2 = ''

//       // this.panoramaView(place.geometry.location.lat(), place.geometry.location.lng())

//       // this.panoramaSettings(place)
//       // infowindow.setContent('<div><strong>' + place.name + '</strong><br></div>')
//       // infowindow.open(map, marker)
//     })
//   })
// }
 inputChanged(){
  setTimeout(()=>{
  
},0)
 }

  openDialog() {
    console.log(`Dialog openDialog:`);
    const dialogRef = this.dialog.open(HomeDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
