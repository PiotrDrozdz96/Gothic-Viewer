import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MAP } from '@toolbar/consts';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {

  private activeObs = new BehaviorSubject<string>(MAP);

  constructor() { }

  public getActiveObs(): Observable<string> { return this.activeObs.asObservable(); }
  public setActive(active: string): void { this.activeObs.next(active); }
}
