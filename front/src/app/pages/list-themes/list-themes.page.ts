import { Component, inject, OnInit} from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-themes',
  standalone: true,
  imports: [],
  templateUrl: './list-themes.page.html',
  styleUrl: './list-themes.page.css'
})
export class ListThemesPage{
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  fetchService: FetchService = inject(FetchService);

  themes: any = [];

  async ngOnInit() {
    await this.loadThemes();
  }

  async loadThemes() {
    try {
      this.themes = await this.fetchService.get('temas');
    } catch (error) {
      console.error('Error fetching themes', error);
    }
  }
}