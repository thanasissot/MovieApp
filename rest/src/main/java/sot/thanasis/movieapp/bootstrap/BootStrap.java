package sot.thanasis.movieapp.bootstrap;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import sot.thanasis.movieapp.model.Actor;
import sot.thanasis.movieapp.model.Movie;
import sot.thanasis.movieapp.repo.ActorRepository;
import sot.thanasis.movieapp.repo.MovieRepository;
import sot.thanasis.movieapp.service.MovieService;

@Component
@RequiredArgsConstructor
public class BootStrap {
	private final MovieRepository movieRepository;
	private final ActorRepository actorRepository;
	private final MovieService movieService;

//	@PostConstruct
	public void bootstrap() {
		Movie movie1 = new Movie();
		movie1.setMovieName("Dumb and Dumber");
		movie1.setYear("1994");
		movie1 = movieRepository.save(movie1);

		Movie movie2 = new Movie();
		movie2.setMovieName("Liar Liar");
		movie2.setYear("1997");
		movie2 = movieRepository.save(movie2);

		Actor actor = new Actor();
		actor.setFullname("Jim Carrey");
		actor = actorRepository.save(actor);

		movieService.assignActorToMovie(actor.getId(), movie1.getId());
		movieService.assignActorToMovie(actor.getId(), movie2.getId());
	}
}
