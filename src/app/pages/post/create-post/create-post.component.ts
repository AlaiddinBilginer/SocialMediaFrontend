import { Component, OnInit } from '@angular/core';
import { CreatePostRequest } from '../../../contracts/posts/create-post-request';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../../services/models/post.service';
import { NotificationIconType, NotificationPositionType, NotificationService } from '../../../services/common/notification.service';
import { ListCategoryResponse } from '../../../contracts/categories/list-category-response';
import { CategoryService } from '../../../services/models/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  createPostForm!: FormGroup;
  categories: ListCategoryResponse[] = [];
  isLoaded: boolean = false;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createPostForm = this.formBuilder.group({
      title: [''],
      content: [''],
      categoryId: ['', Validators.required]
    });
    this.getCategories();
    console.log(this.categories);
  }

  onCreate() {
    const createPostRequest: CreatePostRequest = this.createPostForm.value;
    console.log(createPostRequest);
    this.postService.create(createPostRequest).subscribe({
      next: (response) => {
        this.notificationService.showNotification(response.message, response.succeeded ? 'Gönderi Paylaşıldı': 'Gönderi Paylaşılmadı', {
          notificationIconType: response.succeeded ? NotificationIconType.Success : NotificationIconType.Error,
          notificationPositionType: NotificationPositionType.Center
        });
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
        this.notificationService.showNotification('Gönderi paylaşılırken hata meydana geldi', 'Hata', 
        {
          notificationIconType: NotificationIconType.Error,
          notificationPositionType: NotificationPositionType.Top
        });
      }
    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.categories;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.isLoaded = true;
  }
}
