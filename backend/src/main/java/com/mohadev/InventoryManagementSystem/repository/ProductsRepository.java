package com.mohadev.InventoryManagementSystem.repository;

import com.mohadev.InventoryManagementSystem.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Product,Long> {
}
