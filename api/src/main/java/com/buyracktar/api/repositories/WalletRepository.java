package com.buyracktar.api.repositories;

import com.buyracktar.api.entities.Wallet;
import org.springframework.data.repository.CrudRepository;

public interface WalletRepository extends CrudRepository<Wallet, Long> {
    Iterable<Wallet> findByUserId(Long userId);
}
