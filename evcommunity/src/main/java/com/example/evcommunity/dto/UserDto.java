package com.example.evcommunity.dto;

import com.example.evcommunity.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String username;
    private String password;

    public User toEntity(){
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return user;
    }
}
