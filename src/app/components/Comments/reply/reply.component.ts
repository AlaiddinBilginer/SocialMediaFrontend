import { Component, Input } from '@angular/core';
import { Reply } from '../../../models/reply';
import { TimeAgo } from '../../../pipes/time-ago.pipe';
import { faComments, faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [TimeAgo, FontAwesomeModule],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.css'
})
export class ReplyComponent {
  faComments = faComments;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  
  @Input() reply!: Reply;

  constructor(
    library: FaIconLibrary
  ) {
    library.addIcons(faComments, faThumbsUp, faThumbsDown);
  }
}
