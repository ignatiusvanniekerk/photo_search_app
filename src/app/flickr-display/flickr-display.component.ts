import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlickrService } from 'src/services/flickr.service';
import { fromEvent, Observable } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-flickr-display',
  templateUrl: './flickr-display.component.html',
  styleUrls: ['./flickr-display.component.css']
})
export class FlickrDisplayComponent{
  firstNameControl:FormControl = new FormControl('');
  searchWord: Observable<any> = new Observable()
  constructor(public flickr: FlickrService) { 
    
    this.firstNameControl.valueChanges
    .pipe(debounceTime(1000))
    .subscribe((value) => {      
      this.searchWord =  this.flickr.search_keyword(value).pipe(map((res: any) => res.photos ? res.photos.photo : []))});   
  }

  public sanitizeImage(item: any){
   return `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg'`
  }

}
