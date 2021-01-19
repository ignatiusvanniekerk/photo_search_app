import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit, OnDestroy {  

  public fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  public mobileQuery: MediaQueryList | undefined;

  private _mobileQueryListener!: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }
  async ngOnInit(): Promise<void>{
  }
  ngOnDestroy(): void {
    // @ts-ignore
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
}
