import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputFollowerComponent } from './search-input-follower.component';

describe('SearchInputFollowerComponent', () => {
  let component: SearchInputFollowerComponent;
  let fixture: ComponentFixture<SearchInputFollowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputFollowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
