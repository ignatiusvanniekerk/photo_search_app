import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleApiService } from '../services/google-api.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent } from './home/location.component';
import { HomeDialogComponent } from './home/home-dialog/home-dialog.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleHelperService } from 'src/services/google-helper.service';
const SERVICES = [GoogleApiService,GoogleHelperService] 

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    HomeDialogComponent
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
    MatToolbarModule
  ],
  providers: SERVICES,
  bootstrap: [AppComponent]
})
export class AppModule { }
