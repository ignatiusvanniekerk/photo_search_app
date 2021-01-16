import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
export class FlickrApiService {
  currPage = 1;

  constructor(private http: HttpClient) { }

  async search_keyword(lon: number, lat:number):Promise<any> {
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&lat=${lat}&lon=${lon}&format=json&nojsoncallback=1&per_page=12&page`;

    let results:any = await this.http.get(url + params).toPromise()
      const urlArr:Array<{url:string, title:string}> = [];
      console.log(results)
      results.photos.photo.forEach((ph: FlickrPhoto) => {
          const photoObj = {
            url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
            title: ph.title
          };
          urlArr.push(photoObj);
        });
      return urlArr;
  }
}
