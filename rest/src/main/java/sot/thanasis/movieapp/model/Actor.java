package sot.thanasis.movieapp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(uniqueConstraints={
		@UniqueConstraint(columnNames = {"firstName", "lastName"})
})
public class Actor {
	@Id
	@GeneratedValue
	private Long id;

	@Column
	private String firstName;

	@Column
	private String lastName;

	@JsonManagedReference
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name = "movie_actor",
		joinColumns = @JoinColumn(name = "actor_id"),
		inverseJoinColumns = @JoinColumn(name = "movie_id"))
	private List<Movie> movies;
}
