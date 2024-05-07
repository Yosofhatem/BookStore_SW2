package se.projects.Bookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.projects.Bookstore.entity.Book;
import se.projects.Bookstore.entity.Cart;
import se.projects.Bookstore.entity.CartItem;
import se.projects.Bookstore.entity.User;
import se.projects.Bookstore.model.CartResponse;
import se.projects.Bookstore.repository.BookRepository;
import se.projects.Bookstore.repository.CartItemRepository;
import se.projects.Bookstore.repository.CartRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    public void addToCart(int userId, int bookId, int quantity) {
        User user = userDetailsService.findUserById(userId).orElseThrow();
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }
        Book book = bookRepository.findById(bookId).get();
        CartItem cartItem = cart.getCartItems().stream().filter(item -> item.getBook().getId() == bookId).findFirst().orElse(null);
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setBook(book);
            cartItem.setQuantity(0);
        }
        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartRepository.save(cart);
        cartItemRepository.save(cartItem);
    }

    public void deleteFromCart(int cartId, int bookId, int decreaseQuantity) {
        Optional<CartItem> cartItemToUpdate = cartItemRepository.findByCartIdAndBookId(cartId, bookId);
        if (cartItemToUpdate.isPresent()) {
            CartItem cartItem = cartItemToUpdate.get();
            int newQuantity = Math.max(cartItem.getQuantity() - decreaseQuantity, 0); // Ensure quantity doesn't go negative
            cartItem.setQuantity(newQuantity);
            if (newQuantity == 0) {
                cartItemRepository.delete(cartItem); // Remove item if quantity becomes 0
            } else {
                cartItemRepository.save(cartItem); // Update quantity in database
            }
        }
    }

    public List<CartResponse> booksInSpecificCart(int cartId) {
        List<CartItem> listOfCartItems = cartItemRepository.findAll();
        List<CartItem> filteredCartItems = listOfCartItems.stream()
                .filter(cartItem -> cartItem.getCart().getId().equals(cartId))
                .collect(Collectors.toList());
        List<CartResponse> cartResponses = new ArrayList<>();
        for (CartItem cartItem : filteredCartItems) {
            CartResponse cartResponse = new CartResponse();
            cartResponse.setBook(cartItem.getBook()); // Set the entire Book object
            cartResponse.setQuantity(cartItem.getQuantity());
            cartResponses.add(cartResponse);
        }
        return cartResponses;
    }

    public void removeAllCartItems(int cartId) {
        List<CartItem> cartItemsToRemove = cartItemRepository.findAllByCartId(cartId);
        cartItemRepository.deleteAll(cartItemsToRemove);
    }

    public void removeBookFromCart(int cartId, int bookId) {
        Optional<CartItem> cartItemToRemove = cartItemRepository.findByCartIdAndBookId(cartId, bookId);
        if (cartItemToRemove.isPresent()) {
            cartItemRepository.delete(cartItemToRemove.get());
        }
    }

}
