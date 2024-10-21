import {inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  readonly API_URL = 'http://localhost/back/';
  private authService: AuthService = inject(AuthService);
  private token?: string = this.authService.getToken();

  private getHeaders(): HeadersInit {
    if(this.token == undefined || this.token == ''){
      return {
        'Content-Type': 'application/json'
      }
    }
    else {
      return {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    }
  }

  // Metodo para hacer llamadas GET a la API
  async get<T = any>(url: string): Promise<T>{
    try {
      const response = await fetch(`${this.API_URL}${url}`);
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data);
      }
    }
    catch (error) {
      throw error;
    }
  }

  // Metodo para hacer llamadas POST a la API
  async post<T = any>(url: string, body: string): Promise<T>{
    try {
      const response = await fetch(`${this.API_URL}${url}`,{
        method: 'POST',
        headers: this.getHeaders(),
        body: body
      })
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data);
      }
    }
    catch (error) {
      throw error;
    }
  }

  constructor() { }
}
