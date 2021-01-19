import { Component, OnInit, ChangeDetectorRef, OnDestroy, Injector } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import * as _ from 'lodash';

export let AppInjector: Injector

export function setAppInjector(injector: Injector) {
	if (AppInjector) {
		// Should not happen
		console.error('Programming error: AppInjector was already set')
	} else {
		AppInjector = injector
	}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {  
/**
 * side nav fields
 */
  public fillerNav = [
  {name:'Locations', icon:'fa fa-list', routing:'location'}, 
  {name:'Search Locations', icon:'fa fa-search', routing:'search'}, 
  {name:'Favourites', icon:'fa fa-star', routing:'favourites'}]
  /**
   * media query
   */
  public mobileQuery: MediaQueryList | undefined;
  private _mobileQueryListener!: () => void;

  //////////////////////////////////////////////
  //
  //          CONSTRUCTOR
  //
  //////////////////////////////////////////////
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  //////////////////////////////////////////////
  //
  //          ANGULAR LIFE HOOKS
  //
  //////////////////////////////////////////////   
  async ngOnInit(): Promise<void>{
  }
  ngOnDestroy(): void {
    // @ts-ignore
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
}
