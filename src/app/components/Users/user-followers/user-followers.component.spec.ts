import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowersComponent } from './user-followers.component';

describe('UserFollowersComponent', () => {
  let component: UserFollowersComponent;
  let fixture: ComponentFixture<UserFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFollowersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
