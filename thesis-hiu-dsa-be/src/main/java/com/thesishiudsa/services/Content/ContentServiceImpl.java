package com.thesishiudsa.services.Content;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.thesishiudsa.dto.ContentDto;
import com.thesishiudsa.dto.ContentIndexDto;
import com.thesishiudsa.dto.ExamDto;
import com.thesishiudsa.entity.Content;
import com.thesishiudsa.entity.ContentIndex;
import com.thesishiudsa.entity.Exam;
import com.thesishiudsa.repository.ContentIndexRepository;
import com.thesishiudsa.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;




@Service
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService{
    private final ContentRepository contentRepository;

    private final ContentIndexRepository contentIndexRepository;
    @Override
    public List<ContentDto> getAllContent() {
        List<Content> contentIndicesList = contentRepository.findAll();
        return  contentIndicesList.stream().map(Content::getContentDto).collect(Collectors.toList());
    }

    public Content getContentByContentIndexId (Long contentIndexId) {
        Content content = contentRepository.findAllByContentIndexId(contentIndexId);
        return content ;
    }


}
