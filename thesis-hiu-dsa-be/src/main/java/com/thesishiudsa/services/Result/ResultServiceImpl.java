package com.thesishiudsa.services.Result;
import com.thesishiudsa.dto.ResultDto;
import com.thesishiudsa.entity.Result;
import com.thesishiudsa.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ResultServiceImpl implements ResultService{

    private final ResultRepository resultRepository;
    @Override
    public List<ResultDto> getAllResult() {
        List<Result> resultList = resultRepository.findAll();
        return  resultList.stream().map(Result::getResultDto).collect(Collectors.toList());
    }
}
