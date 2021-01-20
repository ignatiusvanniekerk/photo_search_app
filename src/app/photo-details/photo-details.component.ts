import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleApiService } from 'src/services/google-api.service';
import { GoogleHelperService } from 'src/services/google-helper.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  public photoDetail:any;

  //////////////////////////////////////////////
  //
  //          CONSTRUCTOR
  //
  //////////////////////////////////////////////
  constructor(private route: ActivatedRoute,public googleApiService:GoogleApiService,public googleHelper: GoogleHelperService, private router: Router) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const refrenceFromRoute = routeParams.get('refrence');
    // @ts-ignore
    let details = JSON.parse(localStorage.getItem('resultState')) || []
    this.photoDetail = details.find((item: any)=> item.details.reference === refrenceFromRoute)
    console.log( this.photoDetail)
    if(!this.photoDetail){
      this.router.navigate(['./search'])
    }
  }

  back(){
    this.router.navigate(['./search'])
  }

  icon(){    
    return `{background-image: 'url("${this.photoDetail.details.icon}")'}`
  }

}
