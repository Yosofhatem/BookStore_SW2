package se.projects.Bookstore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import se.projects.Bookstore.entity.Book;
import se.projects.Bookstore.service.BookService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/books")
public class BookController {
    @Autowired
    BookService bookService;

    @GetMapping("/get-all-books")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping("/add-book")
    public ResponseEntity<?> addNewBook(@Valid @RequestBody Book book, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream().map(error -> error.getDefaultMessage()).collect(Collectors.toList());
            System.out.println("book controller " + errors);
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(bookService.addNewBook(book), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-book/{id}")
    public void removeBook(@PathVariable Integer id) {
        bookService.removeBook(id);
    }

    @GetMapping("/search-book/{keyword}")
    public List<Book> searchBook(@PathVariable String keyword) {
        return bookService.searchBooks(keyword);
    }
}
