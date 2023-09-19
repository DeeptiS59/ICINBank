import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const AdminGuardService:CanActivateFn=(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let userRole:String=localStorage.getItem("userRole")||"";
  if(userRole=="admin") {
    return true;
  }
  return inject(Router).createUrlTree(["/login"])};