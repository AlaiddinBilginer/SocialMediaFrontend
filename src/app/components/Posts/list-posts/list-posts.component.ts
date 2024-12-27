import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../../models/post';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [TimeAgo, RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css',
})
export class ListPostsComponent implements OnInit{
  @Input() totalPostCount!: number;
  @Input() posts: Post[] = [];
  @Output() loadPosts = new EventEmitter<void>();
  currentIndex = 0;
  faHeart = faHeart;
  faComment = faComment;

  constructor(
    library: FaIconLibrary
  ) {
    library.addIcons(faHeart, faComment);
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.scrollHeight;

    if(scrollPosition >= documentHeight - 100) {
      this.loadPosts.emit();
    }
  }
}
