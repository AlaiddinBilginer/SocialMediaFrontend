import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPopularPostsComponent } from './list-popular-posts.component';

describe('ListPopularPostsComponent', () => {
  let component: ListPopularPostsComponent;
  let fixture: ComponentFixture<ListPopularPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPopularPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPopularPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
