package se.projects.Bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.projects.Bookstore.entity.Cart;
import se.projects.Bookstore.entity.User;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart findByUser(User user);
}
