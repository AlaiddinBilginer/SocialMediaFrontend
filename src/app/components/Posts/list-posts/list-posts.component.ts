import { Component, Input } from '@angular/core';
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
export class ListPostsComponent{
  @Input() totalPostCount!: number;
  @Input() posts: Post[] = [];
  currentIndex = 0;
  faHeart = faHeart;
  faComment = faComment;

  constructor(
    library: FaIconLibrary
  ) {
    library.addIcons(faHeart, faComment);
  }

    // Resmi bir ileri al
    nextImage(totalImages: number) {
      this.currentIndex = (this.currentIndex + 1) % totalImages;
    }
  
    // Resmi bir geri al
    prevImage(totalImages: number) {
      this.currentIndex = (this.currentIndex - 1 + totalImages) % totalImages;
    }
  
    // Belirli bir resme git
    goToImage(index: number) {
      this.currentIndex = index;
    }
  
    // TrackBy fonksiyonu
    trackByIndex(index: number): number {
      return index;
    }
}
