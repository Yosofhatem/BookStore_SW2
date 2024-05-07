package se.projects.Bookstore.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import se.projects.Bookstore.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);
}
