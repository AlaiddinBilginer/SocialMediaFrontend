import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NgxSpinnerModule } from 'ngx-spinner'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Tarayıcının scroll restoration özelliğini devre dışı bırak
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Sayfa yenilendiğinde veya rota değişiminde scroll sıfırla
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    // Sayfa yenilendiğinde scroll sıfırla
    window.scrollTo(0, 0);
  }
}