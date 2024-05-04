package com.thesishiudsa.services.customer.profile;

import com.thesishiudsa.dto.UserDto;

import java.io.IOException;

public interface CustomerAccountService {

    UserDto getAccountByUserId(Long userId);

    UserDto updateAccountByUserId(Long userId, UserDto userDto) throws IOException;


}
