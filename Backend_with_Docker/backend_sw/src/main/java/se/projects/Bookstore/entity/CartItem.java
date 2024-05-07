package se.projects.Bookstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "cart_item")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @NotNull(message = "Cart association is required for a cart item")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "book_id")
    @NotNull(message = "Book association is required for a cart item")
    private Book book;

    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;
}
