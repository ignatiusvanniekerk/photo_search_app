import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesComponent } from './favourites/favourites.component';
import { FlickrDisplayComponent } from './flickr-display/flickr-display.component';
import { LocationComponent } from './home/location.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  // { path: 'location', component: LocationComponent },
  // { path: 'search', component: SearchComponent },
  // { path: 'favourites', component: FavouritesComponent },
  // { path: 'photoDetails/:refrence', component: PhotoDetailsComponent },
  { path: '**', component: FlickrDisplayComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
