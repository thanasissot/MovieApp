import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Actor } from '../models/actor';
import { HttpClient } from '@angular/common/http';
import { Movie } from "../models/movie";
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

  postActorCreate(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(this.apiUrl + '/create', actor, { headers: this.httpHeaders });
  }

  deleteActor(id: any): Observable<Actor> {
    return this.http.delete<Actor>(this.apiUrl + `/${id}`, { headers: this.httpHeaders });
  }
}
