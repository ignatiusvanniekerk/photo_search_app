import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FlickrApiService } from '../services/flickr-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  
  constructor(private http: FlickrApiService){ }

  public ngOnInit(): void{
    
  }
}
