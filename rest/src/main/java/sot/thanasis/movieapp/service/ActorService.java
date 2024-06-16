package sot.thanasis.movieapp.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import sot.thanasis.movieapp.model.Actor;
import sot.thanasis.movieapp.model.Movie;
import sot.thanasis.movieapp.repo.ActorRepository;
import sot.thanasis.movieapp.repo.MovieRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class ActorService {

	private final ActorRepository actorRepository;

	public List<Actor> findAll() {
		return actorRepository.findAll();
	}


	public Actor create(Actor actor) {
		return actorRepository.save(actor);
	};

	public void delete(Actor actor) {
		actorRepository.delete(actor);
	};

	public Page<Actor> findAllPaged(Integer pageNo, Integer pageSize) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		return actorRepository.findAll(pageable);
	}

}
