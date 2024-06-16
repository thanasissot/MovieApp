package sot.thanasis.movieapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import sot.thanasis.movieapp.dto.MovieDto;
import sot.thanasis.movieapp.mapper.MovieMapper;
import sot.thanasis.movieapp.model.Actor;
import sot.thanasis.movieapp.model.Movie;
import sot.thanasis.movieapp.service.MovieService;

import java.util.List;

@Service
@RequestMapping("/api/movies")
@RestController
@RequiredArgsConstructor
public class MovieController {
	private final MovieService movieService;

	@GetMapping("/all")
	public ResponseEntity<List<Movie>> findAllMovies() {
		List<Movie> res = movieService.findAll();
		return ResponseEntity.ok(res);
	}

	@GetMapping("/{pageNo}/{pageSize}")
	public ResponseEntity<Page<Movie>> findAllMoviesPageable(@PathVariable Integer pageNo, @PathVariable Integer pageSize) {
		Page<Movie> res = movieService.findAllPaged(pageNo, pageSize);
		return ResponseEntity.ok(res);
	}

	@GetMapping("/actors/{id}")
	public ResponseEntity<List<Actor>> findAllActorsByMovieId(@PathVariable Integer id) {
		List<Actor> res = movieService.findAllByMovieId(id);
		return ResponseEntity.ok(res);
	}

	@PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Movie> createMovie(@RequestBody MovieDto movie) throws Exception {
		return ResponseEntity.ok(movieService.create(movie));
	}

	@PutMapping("/{id}/{watched}")
	public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @PathVariable boolean watched) throws Exception {
		Movie movie = movieService.findById(id);
		movie.setWatched(watched);
		movie = movieService.update(movie);
		return ResponseEntity.ok(movie);
	}


}
