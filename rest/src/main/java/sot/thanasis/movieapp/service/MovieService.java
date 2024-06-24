package sot.thanasis.movieapp.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import sot.thanasis.movieapp.dto.MovieDto;
import sot.thanasis.movieapp.exception.MovieException;
import sot.thanasis.movieapp.mapper.MovieMapper;
import sot.thanasis.movieapp.model.Actor;
import sot.thanasis.movieapp.model.Movie;
import sot.thanasis.movieapp.repo.ActorRepository;
import sot.thanasis.movieapp.repo.MovieRepository;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class MovieService {

	private final MovieRepository movieRepository;
	private final ActorRepository actorRepository;
	private final MovieMapper movieMapper;


	public List<Movie> findAll() {
		return movieRepository.findAll();
	}
	public Page<Movie> findAllPaged(Integer pageNo, Integer pageSize) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		return movieRepository.findAll(pageable);
	}

	public Page<Movie> findAllPagedAndSorted(Integer pageNo, Integer pageSize, String sortBy, String asc) {
		Sort.Direction direction = asc.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
		Sort sort = Sort.by(direction, sortBy);
		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
		return movieRepository.findAll(pageable);
	}

	public Page<Movie> findAllPagedAndSortedAndFilteredByName(Integer pageNo, Integer pageSize, String sortBy, String asc, String movieName) {
		Sort.Direction direction = asc.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
		Sort sort = Sort.by(direction, sortBy);
		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
		return movieRepository.findMovieByMovieNameLike("%"+movieName+"%", pageable);
	}

	public List<Actor> findAllByMovieId(Integer id) {
		return actorRepository.findAllByMovieId(id);
	}

	public Movie findById(Long id) {
		try {
			return movieRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(
					HttpStatus.NOT_FOUND, "Movie Not Found", e);
		}
	}

	public Movie findByMovieName(String movieName) {
		Optional<Movie> optionalMovie = movieRepository.findMovieByMovieName(movieName);
		return optionalMovie.orElse(null);
	}

	public Movie create(MovieDto movieDto) throws Exception {

		if (findByMovieName(movieDto.getMovieName()) == null) {
			Movie movie = movieMapper.dtoToEntity(movieDto);
			return movieRepository.save(movie);
		}
		throw new Exception("Movie Already exists");
	};

	public Movie update(Movie movie) throws Exception {
		return movieRepository.save(movie);
	};

	public void delete(Movie movie) {
		movieRepository.delete(movie);
	};


	public void assignActorToMovie(Long actorId, Long movieId) {
		Actor actor = actorRepository.findById(actorId).orElseThrow(() -> new RuntimeException("Actor not found"));
		Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new RuntimeException("Movie not found"));

		if (movie.getActors() == null) {
			movie.setActors(new ArrayList<>());
		}

		movie.getActors().add(actor);

		movieRepository.save(movie);
	}

}
