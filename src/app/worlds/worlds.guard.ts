import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { WorldSettingsService } from '@worlds/services';

@Injectable({
  providedIn: 'root',
})
export class WorldsGuard implements CanActivate, CanActivateChild {

  constructor(
    private worldSettingsService: WorldSettingsService,
    private router: Router,
  ) {
  }

  canActivate(): boolean {
    return this.canNavigate();
  }

  canActivateChild(): boolean {
    return this.canNavigate();
  }

  private canNavigate(): boolean {
    if (!this.worldSettingsService.isValid) {
      this.router.navigate(['settings']);
    }
    return this.worldSettingsService.isValid;
  }
}
