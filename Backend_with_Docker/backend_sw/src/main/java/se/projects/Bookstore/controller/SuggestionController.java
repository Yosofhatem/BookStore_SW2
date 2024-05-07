package se.projects.Bookstore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import se.projects.Bookstore.entity.Suggestion;
import se.projects.Bookstore.service.SuggestionService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/books")
public class SuggestionController {
    @Autowired
    SuggestionService suggestionService;

    @PostMapping("/send-suggestion")
    public ResponseEntity<?> sendSuggestion(@Valid @RequestBody Suggestion suggestion, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream().map(error -> error.getDefaultMessage()).collect(Collectors.toList());
            System.out.println("admin controller " + errors);
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);// Placeholder for error handling
        }
        suggestionService.sendSuggestion(suggestion);
        return ResponseEntity.ok().build();  // Success response
    }

    @GetMapping("/all-suggestions")
    public List<Suggestion> retrieveAllSuggestions() {
        return suggestionService.AllSuggestion();
    }
}
