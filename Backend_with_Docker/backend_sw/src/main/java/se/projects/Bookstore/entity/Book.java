package se.projects.Bookstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotBlank;


@Setter
@Getter
@Entity
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Title is required")
    private String title;

    @Pattern(regexp = "^(http|https)://.*$", message = "Invalid image URL format")
    private String image_url;

    @NotBlank(message = "Book link is required")
    @Pattern(regexp = "^(http|https)://.*$", message = "Invalid book link format")
    private String book_link;

    @NotBlank(message = "Authors are required")
    private String authors;

    @Min(value = 0, message = "Rating cannot be negative")
    @Max(value = 5, message = "Rating cannot be greater than 5")
    private Double rating;

    @Min(value = 0, message = "Price cannot be negative")
    private Double price;

    @Min(value = 0, message = "Discount cannot be negative")
    @Max(value = 1, message = "Discount cannot be greater than 1 (100%)")
    private Double discount;

    @Min(value = 0, message = "Review count cannot be negative")
    private Integer review_count;

    @Min(value = 0, message = "Rating count cannot be negative")
    private Integer rating_count;

    @Min(value = 0, message = "Number of pages cannot be negative")
    private Integer num_pages;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;
}