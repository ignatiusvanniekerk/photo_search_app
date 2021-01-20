import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleApiService } from 'src/services/google-api.service';
import { GoogleHelperService } from 'src/services/google-helper.service';
import { BaseComponent } from '../base-classes/base-google.component';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent extends BaseComponent implements OnInit {
  public photoDetail:any;
  /**
   * Photo card on html
   */
    // @ts-ignore
    public photoCard: HTMLElement;
  //////////////////////////////////////////////
  //
  //          CONSTRUCTOR
  //
  //////////////////////////////////////////////
  constructor(private route: ActivatedRoute) { 
    super()
  }

  //////////////////////////////////////////////
  //
  //          OVERRIDE FUNCTION
  //
  //////////////////////////////////////////////
  async initialize(map:any):Promise<void>{ 
    const routeParams = this.route.snapshot.paramMap;
    const refrenceFromRoute = routeParams.get('refrence');
    // @ts-ignore
    let details = JSON.parse(localStorage.getItem('resultState')) || []
    this.photoDetail = details.find((item: any)=> item.details.reference === refrenceFromRoute)
    
    if(!this.photoDetail){
      this.back()
    }

    this.photoCard = document.getElementById("photo-card") as HTMLInputElement; 
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.photoCard);
    map.setCenter(new google.maps.LatLng(this.photoDetail.lat,this.photoDetail.lng));

  }

  back(){
    this.router.navigate(['./search'])
  }

}
