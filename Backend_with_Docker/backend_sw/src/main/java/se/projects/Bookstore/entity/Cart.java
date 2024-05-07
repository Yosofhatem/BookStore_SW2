package se.projects.Bookstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user")
    @NotNull(message = "User association is required for a cart")
    private User user;

    @OneToMany(mappedBy = "cart")
    private List<CartItem> cartItems;
}

