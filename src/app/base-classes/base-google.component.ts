import { MapsAPILoader } from '@agm/core'
import { Directive, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as _ from 'lodash'
import { City } from 'src/model/City.model'
import { GoogleApiService } from 'src/services/google-api.service'
import { GoogleHelperService } from 'src/services/google-helper.service'
import { AppInjector } from '../app.component'

@Directive()
export abstract class BaseComponent implements OnInit{
    public currentState: 'Locations' | 'Search' | 'Favourites' = 'Locations'
    public subheading: string = ''
    public favLocations: Array<City> = []
    public map: google.maps.Map | undefined;
     // @ts-ignore
    public locationCard: HTMLElement;
    public googleAPi: GoogleApiService = AppInjector.get(GoogleApiService)
	public googleHelper: GoogleHelperService = AppInjector.get(GoogleHelperService)
    public mapsAPILoader: MapsAPILoader = AppInjector.get(MapsAPILoader)
    public router: Router = AppInjector.get(Router)
    public cityLocations: Array<City> = [];   
    public selectedLocation: City = new City(); 
    constructor() {}
    
    async ngOnInit(){
        await this.mapsAPILoader.load() 
        // @ts-ignore
        this.favLocations = JSON.parse(localStorage.getItem("favroute")) || [] 
        this.selectedLocation = this.googleHelper.selectedLocation.name ? this.googleHelper.selectedLocation :{name: 'Level 3 The Quarterdeck, 69 Richefond Circle, Ridgeside Office Park, Umhlanga, 4321',
        lat: -29.73606226716688,
        lng: 31.07154072632158 }
        this.map = this.googleHelper.initMap(-29.73606226716688, 31.07154072632158, 13,  document.getElementById("map") as HTMLInputElement )
        this.locationCard = document.getElementById("pac-location-card") as HTMLInputElement;   
        this.googleHelper.clearControlePosition(this.map) 
        this.initialize(this.map)
    }
    
    async initialize(map:any): Promise<void> {}

    saveToFav(){
        if(this.isFav()){
            this.favLocations = this.favLocations.filter((item)=>item.name !== this.selectedLocation.name && item.lat !== this.selectedLocation.lat && item.lng !== this.selectedLocation.lng)
        }else{
            this.favLocations.push(this.selectedLocation)
        }
           
        localStorage.setItem("favroute",  JSON.stringify(this.favLocations))
    }

    async selectLocation(){
        await this.router.navigate(['./search'])
    }
    favoriteCheck(): string {
		return this.isFav() ? 'fa fa-star' : 'fa fa-star-o'
    }

    isFav():boolean{
       return  !!this.favLocations.find((item)=> item.name === this.selectedLocation.name && item.lat === this.selectedLocation.lat && item.lng === this.selectedLocation.lng)
    }
}
