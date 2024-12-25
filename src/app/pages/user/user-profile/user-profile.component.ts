import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { UserService } from '../../../services/models/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormatDatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userName: string = '';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.paramMap.get('userName') || '';
    this.getUserProfile(this.userName);
    console.log(this.user);
  }

  getUserProfile(userName: string) {
    this.userService.getProfile(userName).subscribe((user) => {
      this.user = user;
    });
  }
}
