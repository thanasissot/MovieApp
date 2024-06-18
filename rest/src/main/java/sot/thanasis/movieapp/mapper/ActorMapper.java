package sot.thanasis.movieapp.mapper;

import org.mapstruct.Mapper;
import sot.thanasis.movieapp.dto.ActorDto;
import sot.thanasis.movieapp.dto.MovieDto;
import sot.thanasis.movieapp.model.Actor;
import sot.thanasis.movieapp.model.Movie;

@Mapper(componentModel = "spring")
public interface ActorMapper {

//    MovieMapper INSTANCE = Mappers.getMapper( MovieMapper.class );

    ActorDto entityToDto(Actor entity);

    Actor dtoToEntity(ActorDto dto);
}
