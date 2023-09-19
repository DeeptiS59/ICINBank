import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const UserGuardService:CanActivateFn=(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let userRole:String=localStorage.getItem("userRole")||"";
  if(userRole=="admin" || "user") {
    return true;
  }
  return inject(Router).createUrlTree(["/login"])};