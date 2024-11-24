import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPhotoUploadComponent } from './post-photo-upload.component';

describe('PostPhotoUploadComponent', () => {
  let component: PostPhotoUploadComponent;
  let fixture: ComponentFixture<PostPhotoUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostPhotoUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPhotoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
