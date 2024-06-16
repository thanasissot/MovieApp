package sot.thanasis.movieapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sot.thanasis.movieapp.model.Actor;
import sot.thanasis.movieapp.model.Movie;
import sot.thanasis.movieapp.service.ActorService;
import sot.thanasis.movieapp.service.MovieService;

import java.util.List;

@Service
@RequestMapping("/api/actors")
@RestController
@RequiredArgsConstructor
public class ActorController {
	private final ActorService actorService;

	@GetMapping("/all")
	public ResponseEntity<List<Actor>> findAllActors() {
		List<Actor> res = actorService.findAll();
		return ResponseEntity.ok(res);
	}

	@GetMapping("/{pageNo}/{pageSize}")
	public ResponseEntity<Page<Actor>> findAllActorsPageable(@PathVariable Integer pageNo, @PathVariable Integer pageSize) {
		Page<Actor> res = actorService.findAllPaged(pageNo, pageSize);
		return ResponseEntity.ok(res);
	}


}
