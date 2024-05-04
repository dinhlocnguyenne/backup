package com.thesishiudsa.services.customer.profile;

import com.thesishiudsa.dto.UserDto;
import com.thesishiudsa.entity.User;
import com.thesishiudsa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class CustomerAccountServiceImpl implements CustomerAccountService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDto getAccountByUserId(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.map(User::getUserDto).orElse(null);
    }

    @Override
    public UserDto updateAccountByUserId(Long userId, UserDto userDto) throws IOException {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(userDto.getName());
            if (userDto.getImg() != null) {
                user.setImg(userDto.getImg().getBytes());
            }
           return  userRepository.save(user).getUserDto();


        }
        return null;
    }


}
