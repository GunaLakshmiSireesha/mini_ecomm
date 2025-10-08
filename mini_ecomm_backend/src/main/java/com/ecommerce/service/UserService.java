package com.ecommerce.service;

import com.ecommerce.dto.AuthResponse;
import com.ecommerce.dto.LoginRequest;
import com.ecommerce.dto.RegisterRequest;
import com.ecommerce.model.Role;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    // ✅ Register new user
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse(false, "❌ Username already exists", null, null, null);
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "❌ Email already exists", null, null, null);
        }

        Role role = request.getRole() != null ? request.getRole() : Role.USER;

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // ✅ Encode password
                .role(role)
                .build();

        userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getUsername(), user.getRole().name());
        return new AuthResponse(true, "✅ Registration successful", token, user.getUsername(), user.getRole().name());
    }

    // ✅ Login user
    public AuthResponse login(LoginRequest request) {
        // 1️⃣ Authenticate using Spring Security
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            // 2️⃣ Load user from DB
            User user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 3️⃣ Generate JWT
            String token = jwtTokenProvider.generateToken(user.getUsername(), user.getRole().name());

            // 4️⃣ Return successful response
            return new AuthResponse(true, "✅ Login successful", token, user.getUsername(), user.getRole().name());

        } catch (Exception e) {
            // 5️⃣ Invalid credentials
            return new AuthResponse(false, "❌ Invalid credentials", null, null, null);
        }
    }
}




