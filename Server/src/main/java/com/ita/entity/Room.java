package com.ita.entity;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;

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

    private Boolean active;

    @OneToOne(fetch = FetchType.EAGER)
    private Address address;

    public Room() {
    }

    public static BuilderRoom newBuilderRoom() {
        return   new Room().new BuilderRoom();
    }

    public class BuilderRoom{
        private BuilderRoom(){}

        public BuilderRoom setId(Long id){
            Room.this.id = id;
            return this;
        }

        public BuilderRoom setNumber(String number){
            Room.this.number = number;
            return this;
        }

        public BuilderRoom setActive(boolean active){
            Room.this.active = active;
            return this;
        }


        public BuilderRoom setAddress(Address address){
            Room.this.address = address;
            return this;
        }

        public Room build(){
            return Room.this;
        }


    }

}
