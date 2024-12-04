import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/post/create-post/create-post.component';
import { authGuard } from './guards/auth.guard';
import { ListPostByCategoryComponent } from './pages/post/list-post-by-category/list-post-by-category.component';
import { PostDetailsComponent } from './pages/post/post-details/post-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'akis', component: HomeComponent },
  { path: 'gonderi-paylas', component: CreatePostComponent, canActivate: [authGuard] },
  { path: 'gonderiler/kategori/:categoryName', component: ListPostByCategoryComponent },
  { path: 'gonderi/detaylar/:postId', component: PostDetailsComponent }
];
