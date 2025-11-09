package com.mohadev.InventoryManagementSystem.service;

import com.mohadev.InventoryManagementSystem.dto.LoginRequest;
import com.mohadev.InventoryManagementSystem.dto.RegisterRequest;
import com.mohadev.InventoryManagementSystem.dto.Response;
import com.mohadev.InventoryManagementSystem.dto.UserDTO;
import com.mohadev.InventoryManagementSystem.entity.User;

public interface UserService {

    Response registerUser(RegisterRequest registerRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getCurrentLoggedInUser();
    Response updateUser(Long id, UserDTO userDTO);
    Response deleteUser(Long id);
    Response getUserTransactions(Long id);
}
