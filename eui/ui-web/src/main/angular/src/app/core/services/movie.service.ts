import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { Actor } from '../../core/model/actor';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

    private apiUrl = 'http://localhost:8080/api/movies'; // Update with your backend API URL
    private httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type':'application/json; charset=utf-8'
    });

      constructor(private http: HttpClient) { }

      getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.apiUrl + '/all');
      }

      postMovieCreate(movie: Movie): Observable<Movie> {
          return this.http.post<Movie>(this.apiUrl + '/create', movie, { headers: this.httpHeaders });
      }

      getMoviesPageable(pageNo: number, pageSize: number): Observable<Movie[]> {
          return this.http.get<Movie[]>(this.apiUrl + `/${pageNo}/${pageSize}`);
    }

      getActorsForMovie(id: number): Observable<Actor[]> {
        return this.http.get<Actor[]>(this.apiUrl + `/actors/${id}`);
      }

      updateMovie(id: number, watched:boolean): Observable<Movie> {
        return this.http.put<Movie>(this.apiUrl + `/${id}/${watched}`, {});
      }

      filterMoviesByWatchedYear(year: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiUrl}?watchedYear=${year}`);
      }
}
