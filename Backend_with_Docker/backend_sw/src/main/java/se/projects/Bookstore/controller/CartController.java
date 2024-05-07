package se.projects.Bookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.projects.Bookstore.model.CartResponse;
import se.projects.Bookstore.service.CartService;

import java.util.List;

@RestController
@RequestMapping("api/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/add_book")
    public void addToCart(@RequestParam Integer userId, @RequestParam Integer bookId, @RequestParam Integer quantity) {
        cartService.addToCart(userId, bookId, quantity);
    }

    @DeleteMapping("/remove_book")
    public void removeFromCart(@RequestParam Integer userId, @RequestParam Integer bookId, @RequestParam Integer quantity) {
        cartService.deleteFromCart(userId, bookId, quantity);
    }

    @GetMapping("/get_books")
    public List<CartResponse> booksInCart(@RequestParam Integer userId) {
        return cartService.booksInSpecificCart(userId);
    }

    @DeleteMapping("/delete_all_books")
    public void removeAllBookFromCart(@RequestParam Integer userId) {
        cartService.removeAllCartItems(userId);
    }

    @DeleteMapping("/delete_book")
    public void removeBookFromCart(@RequestParam Integer userId, @RequestParam Integer bookID) {
        cartService.removeBookFromCart(userId, bookID);
    }
}