import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { Actor } from '../models/actor';
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

      deleteMovie(id: any): Observable<Movie> {
        return this.http.delete<Movie>(this.apiUrl + `/${id}`, { headers: this.httpHeaders });
      }

      getMoviesPageable(pageNo: number, pageSize: number): Observable<Movie[]> {
          return this.http.get<Movie[]>(this.apiUrl + `/${pageNo}/${pageSize}`);
      }

      getMoviesPageableAndSorted(pageNo: number, pageSize: number, sortCol: string, sortDir: string): Observable<any> {
        return this.http.get<Movie[]>(this.apiUrl + `/${pageNo}/${pageSize}/${sortCol}/${sortDir}`);
      }

      getMoviesPageableAndSortedAndFilteredByMovieName(pageNo: number, pageSize: number, sortCol: string, sortDir: string, movieName: string): Observable<any> {
        if (movieName.length === 0) {
          return this.getMoviesPageableAndSorted(pageNo, pageSize, sortCol, sortDir);
        }
        return this.http.get<Movie[]>(this.apiUrl + `/${pageNo}/${pageSize}/${sortCol}/${sortDir}/${movieName}`);
      }

      getActorsForMovie(id: number): Observable<Actor[]> {
        return this.http.get<Actor[]>(this.apiUrl + `/actors/${id}`);
      }

      putUpdateMovie(id: number, watched:boolean): Observable<Movie> {
        return this.http.put<Movie>(this.apiUrl + `/${id}/${watched}`, {});
      }

      filterMoviesByWatchedYear(year: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiUrl}?watchedYear=${year}`);
      }
}
