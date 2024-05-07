package se.projects.Bookstore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import se.projects.Bookstore.entity.ComingSoonBook;
import se.projects.Bookstore.service.ComingSoonService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/books")
public class ComingSoonController {

    @Autowired
    ComingSoonService comingSoonService;

    @GetMapping("/get-all-coming-soon")
    public List<ComingSoonBook> getAllComingSoonBooks() {
        return comingSoonService.retrieveAllComingSoonBooks();
    }

    @PostMapping("/add-coming-soon")
    public ResponseEntity<?> addComingSoonBook(@Valid @RequestBody ComingSoonBook comingSoonBook, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream().map(error -> error.getDefaultMessage()).collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(comingSoonService.addComingSoonBook(comingSoonBook));
    }
}
