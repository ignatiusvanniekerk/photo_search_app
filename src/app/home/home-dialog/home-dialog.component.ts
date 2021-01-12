import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-home-dialog',
  templateUrl: './home-dialog.component.html',
  styleUrls: ['./home-dialog.component.css']
})
export class HomeDialogComponent implements OnInit {
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public allowClose: boolean = false
  constructor() { }


  ngOnInit(): void {
    this.emailFormControl.valueChanges.subscribe((item)=>{

      this.allowClose = this.emailFormControl.valid
      console.log("this.allowClos", this.allowClose)
    })
  }


}
