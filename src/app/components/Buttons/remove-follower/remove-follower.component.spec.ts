import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFollowerComponent } from './remove-follower.component';

describe('RemoveFollowerComponent', () => {
  let component: RemoveFollowerComponent;
  let fixture: ComponentFixture<RemoveFollowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveFollowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
