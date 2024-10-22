import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isValidUser()) {
      // Permite el acceso si está logueado
      return true; 
    } else {
      // Redirige al login si no está logueado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
