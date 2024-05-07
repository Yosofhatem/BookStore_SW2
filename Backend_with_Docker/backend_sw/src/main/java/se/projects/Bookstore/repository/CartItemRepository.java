package se.projects.Bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.projects.Bookstore.entity.CartItem;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findAllByCartId(int cartId);

    Optional<CartItem> findByCartIdAndBookId(int cartId, int bookId);
}
