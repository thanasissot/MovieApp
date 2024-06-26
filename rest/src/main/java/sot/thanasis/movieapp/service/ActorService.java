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
import sot.thanasis.movieapp.dto.ActorDto;
import sot.thanasis.movieapp.mapper.ActorMapper;
import sot.thanasis.movieapp.mapper.MovieMapper;
import sot.thanasis.movieapp.model.Actor;
import sot.thanasis.movieapp.model.Movie;
import sot.thanasis.movieapp.repo.ActorRepository;
import sot.thanasis.movieapp.repo.MovieRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ActorService {

	private final ActorRepository actorRepository;
	private final ActorMapper actorMapper;


	public List<Actor> findAll() {
		return actorRepository.findAll();
	}
	public Page<Actor> findAllPaged(Integer pageNo, Integer pageSize) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		return actorRepository.findAll(pageable);
	}

	public Page<Actor> findAllPagedAndSorted(Integer pageNo, Integer pageSize, String sortBy, String asc) {
		Sort.Direction direction = asc.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
		Sort sort = Sort.by(direction, sortBy);
		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
		return actorRepository.findAll(pageable);
	}

	public Page<Actor> findAllPagedAndSortedAndFilteredByName(Integer pageNo, Integer pageSize, String sortBy, String asc, String movieName) {
		Sort.Direction direction = asc.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
		Sort sort = Sort.by(direction, sortBy);
		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
		return actorRepository.findByFullnameLike("%"+movieName+"%", pageable);
	}

	public Actor create(ActorDto actorDto) throws Exception {
		if (findByActorName(actorDto.getFullname()) == null) {
			Actor actor = actorMapper.dtoToEntity(actorDto);
			return actorRepository.save(actor);
		}
		throw new Exception("Actor Already exists");
	};

	public Actor findById(Long id) {
		try {
			return actorRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(
					HttpStatus.NOT_FOUND, "Actor Not Found", e);
		}
	}

	public Actor findByActorName(String fullname) {
		Optional<Actor> optionalActor = actorRepository.findByFullname(fullname);
		return optionalActor.orElse(null);
	}

	public void delete(Actor actor) {
		actorRepository.delete(actor);
	};



}
