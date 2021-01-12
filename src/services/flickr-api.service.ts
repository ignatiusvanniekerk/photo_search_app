import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlickrApiService {

  constructor(private http: HttpClient) { 
    console.log("FlickrApiService")
  }

  async flicrBasic(): Promise<void>{
    let x = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=7d19cd4b2b54708b0d019d688ed002ed&photo_id=50828148758&format=json&nojsoncallback=1'
    // let x  ="https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ca370d51a054836007519a00ff4ce59e&photo_id=50828148758&format=json&nojsoncallback=1"
    this.http.get(x).subscribe((rest)=>{
      console.log("rest", rest)
    });
    
  }
}
