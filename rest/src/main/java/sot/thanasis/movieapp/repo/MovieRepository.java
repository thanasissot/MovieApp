package sot.thanasis.movieapp.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sot.thanasis.movieapp.model.Movie;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Optional<Movie> findMovieByMovieName(String movieName);
    Optional<Movie> findByMovieNameLike(String movieName);
    Page<Movie> findMovieByMovieNameLike(String movieName, Pageable pageable);
}
