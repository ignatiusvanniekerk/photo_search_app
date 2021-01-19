import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import * as _ from 'lodash';
import { GoogleApiService } from 'src/services/google-api.service';
import { GoogleHelperService } from 'src/services/google-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {  

  public fillerNav = [{name:'Locations', icon:'fa fa-list', routing:'location'}, {name:'Search Locations', icon:'fa fa-search', routing:'search'}, {name:'Favourites', icon:'fa fa-star', routing:'favourites'}]
  public mobileQuery: MediaQueryList | undefined;
  map: any
  private _mobileQueryListener!: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private googleAPi: GoogleApiService,private googleHelper:  GoogleHelperService){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }
  async ngOnInit(): Promise<void>{
    this.map = this.googleHelper.initMap(-33.8688,151.2195, 13,  document.getElementById("map") as HTMLInputElement )
  }
  ngOnDestroy(): void {
    // @ts-ignore
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
}
