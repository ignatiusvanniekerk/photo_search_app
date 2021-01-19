import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleApiService } from 'src/services/google-api.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  public photoDetail:any;
  constructor(private route: ActivatedRoute,private googleApiService:GoogleApiService, private router: Router) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const refrenceFromRoute = routeParams.get('refrence');
    debugger;
    this.photoDetail = this.googleApiService.resultState.find((item: any)=> item.details.reference === refrenceFromRoute)
   
    if(!this.photoDetail){
      this.router.navigate(['./search'])
    }
  }

}
