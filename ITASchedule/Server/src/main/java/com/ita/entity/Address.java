package com.ita.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ita.utils.serializers.LocalTimeDeserializer;
import com.ita.utils.serializers.LocalTimeSerializer;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String address;

    private String codeName;

    @JsonSerialize(using = LocalTimeSerializer.class)
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime workingHoursStart;

    @JsonSerialize(using = LocalTimeSerializer.class)
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime workingHoursEnd;

    private Boolean isActive;

    @OneToOne(fetch = FetchType.EAGER)
    private City city;

    public Address() {
    }

}
