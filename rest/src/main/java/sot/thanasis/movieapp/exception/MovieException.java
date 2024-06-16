package sot.thanasis.movieapp.exception;

public class MovieException extends RuntimeException {
	public MovieException(String errorMessage, Throwable err) {
		super(errorMessage, err);
	}
}
