package com.ecommerce.controller;
import com.ecommerce.model.CartItem;
import com.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartItem>> myCart(@AuthenticationPrincipal UserDetails ud){
        return ResponseEntity.ok(cartService.getCartForUser(ud.getUsername()));
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@AuthenticationPrincipal UserDetails ud,
                                              @RequestParam Long productId,
                                              @RequestParam(defaultValue = "1") int qty){
        return ResponseEntity.ok(cartService.addToCart(ud.getUsername(), productId, qty));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clear(@AuthenticationPrincipal UserDetails ud){
        cartService.clearCart(ud.getUsername());
        return ResponseEntity.ok().build();
    }
}

