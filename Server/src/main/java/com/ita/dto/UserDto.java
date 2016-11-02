package com.ita.dto;

import com.ita.entity.Role;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class UserDto {

    private Long id;

    @NotNull
    private String fullName;

    @NotNull
    @Email
    private String email;

    private String contactInfo;

    @NotNull
    private boolean active;

    private List<String> groupTitles;

    private List<Role> roles;
}
