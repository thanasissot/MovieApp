package sot.thanasis.movieapp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import sot.thanasis.movieapp.dto.MovieDto;
import sot.thanasis.movieapp.model.Movie;

@Mapper(componentModel = "spring")
public interface MovieMapper {

    MovieMapper INSTANCE = Mappers.getMapper( MovieMapper.class );

    MovieDto entityToDto(Movie entity);

    Movie dtoToEntity(MovieDto dto);
}
