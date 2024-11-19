import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/post/create-post/create-post.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'akis', component: HomeComponent },
  { path: 'gonderi-paylas', component: CreatePostComponent, canActivate: [authGuard] }
];
