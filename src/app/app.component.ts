import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FlickrApiService } from '../services/flickr-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pic-a-place';

  constructor(private http: FlickrApiService){
    this.http.flicrBasic()
  }
}
