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

  getActorsPageableAndSorted(pageNo: number, pageSize: number, sortCol: string, sortDir: string): Observable<any> {
    return this.http.get<Actor[]>(this.apiUrl + `/${pageNo}/${pageSize}/${sortCol}/${sortDir}`);
  }

  getActorsPageableAndSortedAndFilteredByFullname(pageNo: number, pageSize: number, sortCol: string, sortDir: string, fullname: string): Observable<any> {
    if (fullname.length === 0) {
      return this.getActorsPageableAndSorted(pageNo, pageSize, sortCol, sortDir);
    }
    return this.http.get<Actor[]>(this.apiUrl + `/${pageNo}/${pageSize}/${sortCol}/${sortDir}/${fullname}`);
  }

  postActorCreate(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(this.apiUrl + '/create', actor, { headers: this.httpHeaders });
  }

  deleteActor(id: any): Observable<Actor> {
    return this.http.delete<Actor>(this.apiUrl + `/${id}`, { headers: this.httpHeaders });
  }
}
