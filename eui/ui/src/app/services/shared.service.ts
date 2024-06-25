import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dialogSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public dialogObservable$: Observable<any> = this.dialogSubject.asObservable();

  constructor() { }

  setDialogObservable$(data: any) {
    this.dialogSubject.next(data);
  }
}
