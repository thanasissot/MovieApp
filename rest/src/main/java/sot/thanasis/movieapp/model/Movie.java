package sot.thanasis.movieapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;


@Entity
@Data
public class Movie {
	@Id
	@GeneratedValue
	private Long id;

	@Column(unique = true)
	private String movieName;
	private String year;

	private boolean watched;

	@JsonBackReference
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "movies")
	private List<Actor> actors;
}
