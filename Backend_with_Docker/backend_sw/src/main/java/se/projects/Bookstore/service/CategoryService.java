package se.projects.Bookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.projects.Bookstore.entity.Book;
import se.projects.Bookstore.repository.BookRepository;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    BookRepository bookRepository;

    public List<Book> retrieveAllCategoryBooks() {
        return bookRepository.findAll();
    }

    public List<Book> retrieveSpecificCategoryBook(String category) {
        return bookRepository.findByCategory(category);
    }
}