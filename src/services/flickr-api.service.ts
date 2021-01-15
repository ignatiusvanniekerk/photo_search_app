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
  public prevKeyword: string = '';
  currPage = 1;

  constructor(private http: HttpClient) { }

  async search_keyword(keyword: string):Promise<any> {
    if (this.prevKeyword === keyword) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    // https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7d19cd4b2b54708b0d019d688ed002ed&lat=33.75068535&lon=-84.37809596823843&format=json
    this.prevKeyword = keyword;
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&lat=53.2734&lon=-7.77832031&format=json&nojsoncallback=1&per_page=12&page=${this.currPage}`;

    let results:any = await this.http.get('https://api.foursquare.com/v2/venues/explore?client_id=G5REEVPXWNE42GFZLAKY1VLT1CCOCMLTAWKE52TRTHHL3DTG&client_secret=NZM34ATSFWWMFBBR4C01GPA11DMO1ESVSMEA35JRELENKNCO&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee').toPromise()
      const urlArr:Array<{url:string, title:string}> = [];
      console.log(results)
    // results.photos.photo.forEach((ph: FlickrPhoto) => {
    //     const photoObj = {
    //       url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
    //       title: ph.title
    //     };
    //     urlArr.push(photoObj);
    //   });
      return urlArr;
  }
}
