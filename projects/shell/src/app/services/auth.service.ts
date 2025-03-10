import { Injectable, signal } from '@angular/core';

export interface User {
  username: string;
  isLoggedIn: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Nesse serviço usei o local storage para armazenar o usuário logado

  user = signal<User>(this.loadUser());

  login(username: string) {
    const newUser = { username, isLoggedIn: true };
    this.user.set(newUser);
    sessionStorage.setItem('user', JSON.stringify(newUser));
  }

  logout() {
    this.user.set({ username: '', isLoggedIn: false });
    sessionStorage.removeItem('user');
  }

  getUser() {
    return this.user().username;
  }

  isAuthenticated() {
    return this.user().isLoggedIn;
  }

  private loadUser(): User {
    const storedUser = sessionStorage.getItem('user');
    return storedUser
      ? JSON.parse(storedUser)
      : { username: '', isLoggedIn: false };
  }
}
