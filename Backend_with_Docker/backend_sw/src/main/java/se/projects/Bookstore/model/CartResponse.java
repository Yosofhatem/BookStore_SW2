package se.projects.Bookstore.model;

import lombok.Getter;
import lombok.Setter;
import se.projects.Bookstore.entity.Book;

@Setter
@Getter
public class CartResponse {
    private Book book;
    private int quantity;
}
