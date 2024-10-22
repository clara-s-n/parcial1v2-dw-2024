import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  username: string = '';
  password: string = '';

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  async onSubmitLogin() {
    await this.authService.login(this.username, this.password);
    if (this.authService.isValidUser()) {
      this.router.navigate(['/list-themes']);
    }
  }
}
