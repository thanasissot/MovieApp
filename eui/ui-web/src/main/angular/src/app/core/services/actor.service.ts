import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Actor } from '../../core/model/actor';
import { HttpClient } from '@angular/common/http';
import {Movie} from "../model/movie";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
    private apiUrl = 'http://localhost:8080/api/actors'; // Update with your backend API URL
    private httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type':'application/json; charset=utf-8'
    });
  constructor(private http: HttpClient) { }

    getActors(): Observable<Actor[]> {
        return this.http.get<Actor[]>(this.apiUrl + '/all');
    }

    getActorsPageable(pageNo: number, pageSize: number): Observable<Actor[]> {
        return this.http.get<Actor[]>(this.apiUrl + `/${pageNo}/${pageSize}`);
    }

}
