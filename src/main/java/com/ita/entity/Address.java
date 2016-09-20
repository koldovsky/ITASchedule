package com.ita.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String address;

    private String codeName;

    private String workingHoursStart;

    private String workingHoursEnd;


    @OneToOne(fetch = FetchType.EAGER)
    private City city;

    private Boolean active;

    public Address() {
    }
    public Address(String address,String codeName,String workingHoursStart,String workingHoursEnd,City city,Boolean active){
        this.address = address;
        this.codeName = codeName;
        this.workingHoursStart = workingHoursStart;
        this.workingHoursEnd = workingHoursEnd;
        this.city = city;
        this.active = active;
    }
}
