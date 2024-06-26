import {Movie} from "./movie";

export interface Actor {
  id: number;
  firstName: string;
  lastName: string;
  movies: Movie[];
}
