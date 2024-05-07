package se.projects.Bookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.projects.Bookstore.entity.Suggestion;
import se.projects.Bookstore.repository.SuggestionRepository;

import java.util.List;

@Service
public class SuggestionService {
    @Autowired
    SuggestionRepository suggestionRepository;

    public void sendSuggestion(Suggestion suggestion) {
        suggestionRepository.save(suggestion);
    }

    public List<Suggestion> AllSuggestion() {
        return suggestionRepository.findAll();
    }
}
