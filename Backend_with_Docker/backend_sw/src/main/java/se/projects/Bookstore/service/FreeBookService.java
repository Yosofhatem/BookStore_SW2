package se.projects.Bookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.projects.Bookstore.entity.Book;
import se.projects.Bookstore.repository.BookRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FreeBookService {
    @Autowired
    BookRepository bookRepository;

    public List<Book> retrieveAllFreeBooks() {
        return bookRepository.findByPrice(0.0);
    }

    public Optional<Book> retrieveSpecificFreeBook(Integer id) {
        Optional<Book> bookOptional = bookRepository.findById(id);
        return Optional.of(bookOptional.orElse(new Book()));
    }
}
