import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA }   from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-box',
  templateUrl: './photo-box.component.html',
  styleUrls: ['./photo-box.component.css']
})

export class PhotoBoxComponent implements OnInit {

  /**
   * photo tiles
   */
  tiles: Array<any> = [];

  //////////////////////////////////////////////
  //
  //          CONSTRUCTOR
  //
  //////////////////////////////////////////////
  constructor(private router: Router,
    public dialogRef: MatDialogRef<PhotoBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.data.result.forEach((item:any)=>{
        this.tiles.push({imageUrl: item.photoUrl, name: item.name, cols:2  , rows:2, reference:item.details.reference})
      })
     }

  //////////////////////////////////////////////
  //
  //          ANGULAR LIFE HOOKS
  //
  //////////////////////////////////////////////
  ngOnInit(): void {
  }

  photoDetails(tile:any){
    this.dialogRef.close()
    this.router.navigate([`./photoDetails/${tile.reference}`])
  }
}
