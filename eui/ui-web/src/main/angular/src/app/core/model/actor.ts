import {Movie} from "./movie";

export interface Actor {
  id: number;
  fullname: string;
  movies: Movie[];
}
