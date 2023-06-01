package com.example.evcommunity.entity;

import com.example.evcommunity.dto.UserDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name="users")
public class User {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="user_id")
    Long userId;

    String username;
    String password;

    public UserDto toDto(){
        return new UserDto(username, password);
    }
}
