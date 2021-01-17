import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './home/location.component';

const routes: Routes = [
  { path: 'home', component: LocationComponent },
  // { path: 'second-component', component: SecondComponent },
  { path: '**', component: LocationComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
