import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPublicPostsComponent } from './list-public-posts.component';

describe('ListPublicPostsComponent', () => {
  let component: ListPublicPostsComponent;
  let fixture: ComponentFixture<ListPublicPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPublicPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPublicPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
