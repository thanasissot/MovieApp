package sot.thanasis.movieapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sot.thanasis.movieapp.model.Movie;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Optional<Movie> findMovieByMovieName(String movieName);
}
