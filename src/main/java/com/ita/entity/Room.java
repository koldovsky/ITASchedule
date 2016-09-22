package com.ita.entity;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Room {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String number;

    @OneToOne(fetch = FetchType.EAGER)
    private Address address;

    private Boolean active;

    public Room() {
    }

    public Room(String number, Address address, Boolean active) {
        this.number = number;
        this.address = address;
        this.active = active;
    }
}
