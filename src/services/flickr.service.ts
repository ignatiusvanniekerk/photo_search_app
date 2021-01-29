import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  public prevKeyword: string = '';
  currPage = 1;

  constructor(private http: HttpClient) { }


  search_keyword(keyword: string):any {   
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7d19cd4b2b54708b0d019d688ed002ed&text=${keyword}&format=json&nojsoncallback=1`
    return this.http.get(url)
  }
}
