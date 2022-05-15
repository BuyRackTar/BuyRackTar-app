package com.buyracktar.api.entities;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CategoryTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "walletId")
    private Wallet wallet;

    private Long categoryId;

    private BigDecimal amount;

    @JsonIgnore
    private LocalDateTime time;

    private String description;

    @JsonGetter("time")
    public long getTime() {
        return Timestamp.valueOf(time).getTime();
    }
}