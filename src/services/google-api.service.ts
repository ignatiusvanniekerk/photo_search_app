import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
export const GOOGLE_API_PREFEX = 'https://maps.googleapis.com/maps/api/place/'
const proxyurl = "https://cors-anywhere.herokuapp.com/";
@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  
  constructor(private http: HttpClient) { }

  async nearbySearch(lat:number, lon: number, radius: number = 1500 ):Promise<any> {    
    try{
      let mapper:Array<any> = []
      const path = `nearbysearch/json?location=${lat},${lon}&radius=${radius}&key=${environment.google_api.key}`
      let result: any = await this.http.get(proxyurl + GOOGLE_API_PREFEX + path).toPromise()
      console.log('result', result)
       result.results.forEach((item: any)=>{
        let photos = _.get(item, 'photos[0].photo_reference', false)
        if(photos){
          mapper.push([item.name, item.geometry.location.lat, item.geometry.location.lng, 'http://labs.google.com/ridefinder/images/mm_20_purple.png', `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos}&key=${environment.google_api.key}`])
        }        
       })
      console.log('mapper', mapper)
      return mapper
    }catch(error){
      console.log('[ERROR] ',error)
    }
  }

  
}

