package com.thesishiudsa.services.admin.account;

import com.thesishiudsa.dto.UserDto;

import java.util.List;

public interface AccountService {

    List<UserDto> getAllAccounts();

    UserDto getUserById(Long userId);

}
