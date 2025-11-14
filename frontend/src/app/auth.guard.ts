import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // 1. Verificamos se o token existe no localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      // 2. Se o token existe, o usuário pode passar.
      return true;
    } else {
      // 3. Se não existe, redirecionamos para a página de login.
      this.router.navigate(['/login']);
      return false;
    }
  }
}