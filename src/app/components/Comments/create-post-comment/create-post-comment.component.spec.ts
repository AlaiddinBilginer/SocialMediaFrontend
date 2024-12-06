import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostCommentComponent } from './create-post-comment.component';

describe('CreatePostCommentComponent', () => {
  let component: CreatePostCommentComponent;
  let fixture: ComponentFixture<CreatePostCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
