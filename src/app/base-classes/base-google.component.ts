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

    //////////////////////////////////////////////
    //
    //         INHERITED VAR
    //
    //////////////////////////////////////////////
    public currentState: 'Locations' | 'Search' | 'Favourites' = 'Locations'

    /**
     * list of randon locations or favorites
     */
    public cityLocations: Array<City> = [];   

    /**
     * selected location 
     */
    public selectedLocation: City = new City(); 

    /**
     * sub heading per page
     */
    public subheading: string = ''

    /**
     * locally stored favorites
     */
    public favLocations: Array<City> = []

    /**
     * shared map item
     */
    public map: google.maps.Map | undefined;

    /**
     * Location card on html
     */
     // @ts-ignore
    public locationCard: HTMLElement;

    //////////////////////////////////////////////
    //
    //         SERVICE INJECTION
    //
    //////////////////////////////////////////////
    public googleAPi: GoogleApiService = AppInjector.get(GoogleApiService)
	public googleHelper: GoogleHelperService = AppInjector.get(GoogleHelperService)
    public mapsAPILoader: MapsAPILoader = AppInjector.get(MapsAPILoader)
    public router: Router = AppInjector.get(Router)
   

    //////////////////////////////////////////////
    //
    //          CONSTRUCTOR
    //
    //////////////////////////////////////////////
    constructor() {}
    
    //////////////////////////////////////////////
    //
    //          ANGULAR LIFE HOOKS
    //
    //////////////////////////////////////////////
    async ngOnInit(){
        await this.mapsAPILoader.load() 
        // @ts-ignore
        this.favLocations = JSON.parse(localStorage.getItem("favroute")) || [] 

        this.selectedLocation = this.googleHelper.selectedLocation.name ? this.googleHelper.selectedLocation :{name: 'Level 3 The Quarterdeck, 69 Richefond Circle, Ridgeside Office Park, Umhlanga, 4321',
        lat: -29.73606226716688,
        lng: 31.07154072632158 }
        if(document.getElementById("map") as HTMLInputElement ){
            this.map = this.googleHelper.initMap(this.googleHelper.selectedLocation.lat, this.googleHelper.selectedLocation.lng, 13,  document.getElementById("map") as HTMLInputElement )
            this.locationCard = document.getElementById("pac-location-card") as HTMLInputElement;   
            this.googleHelper.clearControlePosition(this.map) 
        }
        
        this.initialize(this.map)
    }
    
    //////////////////////////////////////////////
    //
    //          OVERRIDE FUNCTION
    //
    //////////////////////////////////////////////
    async initialize(map:any): Promise<void> {}

    saveToFav(){
        if(this.isFav()){
            this.favLocations = this.favLocations.filter((item)=>item.name !== this.selectedLocation.name && item.lat !== this.selectedLocation.lat && item.lng !== this.selectedLocation.lng)
        }else{
            this.favLocations.push(this.selectedLocation)
        }
           
        localStorage.setItem("favroute",  JSON.stringify(this.favLocations))
    }

  
    //////////////////////////////////////////////
    //
    //          SHARED FUNTIONS
    //
    //////////////////////////////////////////////

    /**
     * location is selected and navigates to seach
     */
    async selectLocation(){
        await this.router.navigate(['./search'])
    }

    /**
     * Check is item is part of fav and return class for icon
     */
    favoriteCheck(): string {
		return this.isFav() ? 'fa fa-star' : 'fa fa-star-o'
    }

    /**
     * returns boolean if in favorites
     */
    isFav():boolean{
       return  !!this.favLocations.find((item)=> item.name === this.selectedLocation.name && item.lat === this.selectedLocation.lat && item.lng === this.selectedLocation.lng)
    }
}
