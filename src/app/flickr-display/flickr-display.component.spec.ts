import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlickrDisplayComponent } from './flickr-display.component';

describe('FlickrDisplayComponent', () => {
  let component: FlickrDisplayComponent;
  let fixture: ComponentFixture<FlickrDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlickrDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickrDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
