package com.ita.entity;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
public class Room {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private Integer number;

    @OneToOne(fetch = FetchType.EAGER)
    private Address address;

    private Boolean active;

    public Room() {
    }

    public Room(Integer number, Address address, Boolean active) {
        this.number = number;
        this.address = address;
        this.active = active;
    }
}
