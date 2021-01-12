import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlickrApiService } from '../services/flickr-api.service';
import { HttpClientModule } from '@angular/common/http';

// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {HttpModule, JsonpModule} from '@angular/http';
// import { AppComponent } from './app.component';
// import {MaterialRootModule, MdInputModule, MaterialModule} from '@angular/material';
// import {WelcomeComponent} from './welcome/welcome.component';
// import { TopNavbarComponent } from './top-navbar/top-navbar.component';
// import { FullPageSpinnerComponent } from './full-page-spinner/full-page-spinner.component';
// import { FooterComponent } from './footer/footer.component';
// import {AngularFireModule} from 'angularfire2';
// import {firebaseConfig} from '../environments/firebase.config';
// import { AgmCoreModule } from 'angular2-google-maps/core';
// import { MapMarkerComponent } from './map-marker/map-marker.component';
// import {CommonModule} from '@angular/common';
// import {MdlModule} from 'angular2-mdl';
// import {Routes, RouterModule} from '@angular/router';
// import { JulieComponent } from './julie/julie.component';
// import { AutocompleteComponent } from './autocomplete/autocomplete.component';
// import {SERVICE_PROVIDERS} from '../services/service-providers';

const SERVICES = [FlickrApiService] 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
    


  ],
  providers: SERVICES,
  bootstrap: [AppComponent]
})
export class AppModule { }
