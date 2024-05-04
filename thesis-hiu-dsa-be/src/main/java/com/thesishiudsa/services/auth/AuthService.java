package com.thesishiudsa.services.auth;

import com.thesishiudsa.dto.SignupRequestDtoDto;
import com.thesishiudsa.dto.UserDto;

public interface AuthService {

    public UserDto createUser(SignupRequestDtoDto signupRequest);

    public boolean hasUserWithEmail(String email);
}
