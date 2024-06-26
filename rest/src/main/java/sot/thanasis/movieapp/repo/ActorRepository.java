package sot.thanasis.movieapp.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sot.thanasis.movieapp.model.Actor;

import java.util.List;
import java.util.Optional;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Long> {

	@Query(
			value = "SELECT * FROM Actor a INNER JOIN movie_actor m ON a.id = m.actor_id WHERE m.movie_id = ?1",
			nativeQuery = true)
	List<Actor> findAllByMovieId(Integer id);

	Optional<Actor> findByFirstNameAndLastName(String firstName, String lastName);
	Page<Actor> findByFirstNameLikeAndLastNameLike(String firstName, String lastName, Pageable pageable);
}
