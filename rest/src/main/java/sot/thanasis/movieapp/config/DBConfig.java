package sot.thanasis.movieapp.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "sot.thanasis.movieapp")
@EntityScan(basePackages = "sot.thanasis.movieapp")
@ComponentScan(basePackages = "sot.thanasis.movieapp")
public class DBConfig {


}
