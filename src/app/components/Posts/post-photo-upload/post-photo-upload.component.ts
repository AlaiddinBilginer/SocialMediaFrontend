import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-post-photo-upload',
  standalone: true,
  imports: [NgxDropzoneModule],
  templateUrl: './post-photo-upload.component.html',
  styleUrl: './post-photo-upload.component.css'
})
export class PostPhotoUploadComponent {
  files: File[] = [];
  @Output() filesChanges = new EventEmitter<File[]>();

  onSelect(event: NgxDropzoneChangeEvent) {
    this.files.push(...event.addedFiles);
    this.filesChanges.emit(this.files);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.filesChanges.emit(this.files);
  }

}
