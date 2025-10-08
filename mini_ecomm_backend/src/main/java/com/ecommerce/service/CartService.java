package com.ecommerce.service;

import com.ecommerce.model.*;
import com.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<CartItem> getCartForUser(String username){
        User user = userRepository.findByUsername(username).orElseThrow();
        return cartItemRepository.findByUser(user);
    }

    public CartItem addToCart(String username, Long productId, int qty){
        User user = userRepository.findByUsername(username).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();
        CartItem cartItem = CartItem.builder().user(user).product(product).quantity(qty).build();
        return cartItemRepository.save(cartItem);
    }

    public void clearCart(String username){
        User user = userRepository.findByUsername(username).orElseThrow();
        cartItemRepository.deleteByUser(user);
    }
}



