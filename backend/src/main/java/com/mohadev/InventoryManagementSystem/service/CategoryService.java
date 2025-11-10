package com.mohadev.InventoryManagementSystem.service;

import com.mohadev.InventoryManagementSystem.dto.CategoryDTO;
import com.mohadev.InventoryManagementSystem.dto.Response;

public interface CategoryService {
    Response createCategory(CategoryDTO categoryDTO);
    Response getAllCategories();
    Response getCategoryById(Long id);
    Response updateCategory(Long id, CategoryDTO categoryDTO);
    Response deleteCategory(Long id);
}
