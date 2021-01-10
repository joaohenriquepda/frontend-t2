import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  userAuth = JSON.parse(localStorage.getItem('isacAuth'));

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.userAuth !== null) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }

    console.log('Não está logado');
    return false;
  }
}
