import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHome, faCompass, faFire } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../../../services/models/category.service';
import { ListCategoryResponse } from '../../../contracts/categories/list-category-response';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  categories: ListCategoryResponse[] = [];

  constructor(
    library: FaIconLibrary,
    private categoryService: CategoryService
  ) {
    library.addIcons(faHome, faCompass, faFire);
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data.categories;
    });
  }
}
