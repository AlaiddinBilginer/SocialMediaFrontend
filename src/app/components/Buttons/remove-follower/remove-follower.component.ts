import { Component, Input } from '@angular/core';
import { UserService } from '../../../services/models/user.service';
import { NotificationService } from '../../../services/common/notification.service';
import { FollowComponent } from '../follow/follow.component';
import { IdentityService } from '../../../services/auth/identity.service';

@Component({
  selector: 'app-remove-follower',
  standalone: true,
  imports: [FollowComponent],
  templateUrl: './remove-follower.component.html',
  styleUrl: './remove-follower.component.css'
})
export class RemoveFollowerComponent {
  @Input() userId: string = '';
  @Input() userName: string = '';
  @Input() profileOwner: string = '';
  @Input() isFollower: boolean = false;
  isRemoved: boolean = false;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    public identityService: IdentityService
  ) {}

  remove() {
    this.notificationService.confirmDialog(
      "Emin Misiniz?", "Takipçiyi kaldırmak istediğinizden emin misiniz?", "evet", 
      "Başarılı", "Takipçi başarılı bir şekilde kaldırıldı", () => {
        this.userService.deleteFromFollowers(this.userId).subscribe((response) => {
          this.isRemoved = true;
        });
      });
  }
}
