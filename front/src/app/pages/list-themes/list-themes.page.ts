import { Component, inject} from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-themes',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list-themes.page.html',
  styleUrl: './list-themes.page.css'
})
export class ListThemesPage{
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