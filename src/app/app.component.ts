import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FlickrApiService } from '../services/flickr-api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public backgroundImages: Array<any> =  [{height: 10, width: 10}]
  
  constructor(private flicAPIService: FlickrApiService){ }

  async ngOnInit(): Promise<void>{
    // this.backgroundImages = await this.flicAPIService.search_keyword('cat')
    console.log("this.backgroundImages", this.backgroundImages)
  }

  url(item: any){
    return `url(${item.url}_m.jpg)`
  }
  
}
