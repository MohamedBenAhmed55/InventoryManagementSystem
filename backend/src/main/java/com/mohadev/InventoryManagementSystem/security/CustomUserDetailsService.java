package com.mohadev.InventoryManagementSystem.security;

import com.mohadev.InventoryManagementSystem.entity.User;
import com.mohadev.InventoryManagementSystem.exceptions.NotFoundException;
import com.mohadev.InventoryManagementSystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final String EXCEPTION_MESSAGE = "User Email Not Found";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new NotFoundException(EXCEPTION_MESSAGE));

        return AuthUser.builder()
                .user(user)
                .build();
    }
}
