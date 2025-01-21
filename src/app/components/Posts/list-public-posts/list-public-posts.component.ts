import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../../models/post';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { NotificationService } from '../../../services/common/notification.service';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { LoginModalComponent } from '../../Auth/login-modal/login-modal.component';
import { IdentityService } from '../../../services/auth/identity.service';
import { PostService } from '../../../services/models/post.service';

@Component({
  selector: 'app-list-public-posts',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule, TimeAgo, LoginModalComponent],
  templateUrl: './list-public-posts.component.html',
  styleUrl: './list-public-posts.component.css'
})
export class ListPublicPostsComponent implements OnInit {
  @Input() totalPostCount!: number;
  @Input() posts: Post[] = [];
  @Output() loadPosts = new EventEmitter<void>();
  isLoginModalOpen = false;
  isModalAlreadyOpened = false;

  faHeart = faHeart;
  faComment = faComment;

  constructor(
    private identityService: IdentityService
  ) {}
  
  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }
  
  openModal(): void {
    this.isLoginModalOpen = !this.isLoginModalOpen;
  }

  onScroll(): void {
    if(this.identityService.isAuthenticated) {
      if (this.isModalAlreadyOpened) {
        return;
      }
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.scrollHeight;

      if(scrollPosition >= documentHeight - 100) {
        this.openModal();
        this.isModalAlreadyOpened = true;
      }
    } else {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.scrollHeight;
  
      if(scrollPosition >= documentHeight - 100) {
        this.loadPosts.emit();
      }
    }
  }

}
