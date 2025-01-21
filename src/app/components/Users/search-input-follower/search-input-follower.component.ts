import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, NgxSpinnerModule, CommonModule],
  templateUrl: './search-input-follower.component.html',
})
export class SearchInputComponent {
  @Input() isLoading: boolean = false;
  @Input() placeholder: string = 'Ara...';
  @Output() onSearch = new EventEmitter<string>();
  @Input() mode: string = '';
  searchTerm: string = '';

  faSearch = faSearch;
}
