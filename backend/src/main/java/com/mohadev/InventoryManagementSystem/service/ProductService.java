package com.mohadev.InventoryManagementSystem.service;

import com.mohadev.InventoryManagementSystem.dto.ProductDTO;
import com.mohadev.InventoryManagementSystem.dto.Response;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    Response saveProduct(ProductDTO productDTO, MultipartFile imageFile) throws IllegalAccessException;
    Response updateProduct(ProductDTO productDTO, MultipartFile imageFile);
    Response getAllProducts();
    Response getProductById(Long id);
    Response deleteProduct(Long id);
}
