package com.thesishiudsa.services.admin.ExamDetail;
import java.util.List;
import java.util.stream.Collectors;

import com.thesishiudsa.dto.ExamDetailDto;
import com.thesishiudsa.entity.ExamDetail;
import com.thesishiudsa.repository.ExamDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;




@Service
@RequiredArgsConstructor
public class ExamDetailServiceImpl implements ExamDetailService{
    private final ExamDetailRepository examDetailRepository;
    @Override
    public List<ExamDetailDto> getAllExamDetail() {
        List<ExamDetail> examDetailList = examDetailRepository.findAll();
        return  examDetailList.stream().map(ExamDetail::getExamDetailDto).collect(Collectors.toList());
    }
}
