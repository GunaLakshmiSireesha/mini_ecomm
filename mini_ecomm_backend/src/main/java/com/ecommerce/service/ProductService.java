package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }
    public Product update(Long id, Product product){
        Product ex = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        ex.setName(product.getName()); ex.setDescription(product.getDescription()); ex.setPrice(product.getPrice()); ex.setStock(product.getStock());
        return productRepository.save(ex);
    }

    public Product getById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}

