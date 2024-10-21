import {inject, Injectable} from '@angular/core';
import {FetchService} from './fetch.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token? = localStorage.getItem('token');
  private fetchService: FetchService = inject(FetchService);

  // Metodo para verificar si el usuario esta logueado
  isValidUser(): boolean{
    return !!this.token;
  }
  // Metodo para cerrar sesion
  logout(): void{
    localStorage.removeItem('token');
  }

  // Login
  async login(username: string, password: string): Promise<void>{
    console.log("username:", username);
    console.log("password", password);
    // Hacer llamada a la API
    try{
      const response = await this.fetchService.post('auth/', JSON.stringify({username, password}));
      const data = await response.json();
      // Guardar token y setearlo en el local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.usuario));
    }
    catch(error){
      throw error;
    }
  }

  // Obtener token
  getToken(): string{
    return this.token || '';
  }

  // Saber si el usuario es admin
  isAdmin(): boolean{
    const user = localStorage.getItem('user');
    if(user){
      const {is_admin} = JSON.parse(user);
      return is_admin;
    }
    return false
  }
  constructor() { }
}
