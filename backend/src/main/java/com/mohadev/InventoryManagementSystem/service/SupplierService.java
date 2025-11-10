package com.mohadev.InventoryManagementSystem.service;

import com.mohadev.InventoryManagementSystem.dto.Response;
import com.mohadev.InventoryManagementSystem.dto.SupplierDTO;

public interface SupplierService {
    Response addSupplier(SupplierDTO supplierDTO);
    Response updateSupplier(Long id, SupplierDTO supplierDTO);
    Response getAllSuppliers();
    Response getSupplierById(Long id);
    Response deleteSupplier(Long id);
}
