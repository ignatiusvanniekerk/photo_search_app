import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, setAppInjector } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleApiService } from '../services/google-api.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent } from './home/location.component';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleHelperService } from 'src/services/google-helper.service';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoBoxComponent } from './search/photo-box/photo-box.component';
const SERVICES = [GoogleApiService,GoogleHelperService, GoogleMapsAPIWrapper] 

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    SearchComponent,
    FavouritesComponent,
    PhotoDetailsComponent,
    PhotoBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyABXedcAIlWdW2nh8sb9wHaedMT2YnCpps', libraries: ["places"]
  }) 
    
  ],
  providers: SERVICES,
  bootstrap: [AppComponent]
})
export class AppModule {
	constructor(injector: Injector) {
		setAppInjector(injector)
	}
}
