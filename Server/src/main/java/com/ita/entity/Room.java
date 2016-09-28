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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String number;

    private Boolean isActive;

    @OneToOne(fetch = FetchType.EAGER)
    private Address address;

    public Room() {
    }

}