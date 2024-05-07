package se.projects.Bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.projects.Bookstore.entity.Suggestion;

public interface SuggestionRepository extends JpaRepository<Suggestion, Integer> {

}
