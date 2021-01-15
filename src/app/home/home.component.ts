import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlickrApiService } from 'src/services/flickr-api.service';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public localStorageUser: string = '';
  constructor(public dialog: MatDialog, private flicAPIService: FlickrApiService) { }

   ngOnInit(): void {
    this.localStorageUser = localStorage.getItem('pic-a-place-user') || "";
    
    if(!this.localStorageUser){
      this.openDialog()
    }
  }

  openDialog() {
    console.log(`Dialog openDialog:`);
    const dialogRef = this.dialog.open(HomeDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
