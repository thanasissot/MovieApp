import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSubListComponent } from './movie-sub-list.component';

describe('MovieSubListComponent', () => {
  let component: MovieSubListComponent;
  let fixture: ComponentFixture<MovieSubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSubListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
