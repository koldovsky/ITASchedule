package com.ita.dto;


import com.ita.entity.Room;
import com.ita.repository.AddressJpaRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Component
public class RoomDto {

    private Long id;

    @NotNull
    private String number;

    private Boolean active;

    @NotNull
    private String address;


}
