package com.thesishiudsa.services.ContentIndex;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.thesishiudsa.dto.ContentIndexDto;
import com.thesishiudsa.entity.ContentIndex;
import com.thesishiudsa.repository.ContentIndexRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;




@Service
@RequiredArgsConstructor

public class ContentIndexServiceImpl implements ContentIndexService {
    private final ContentIndexRepository contentIndexRepository;
    @Override
    public List<ContentIndexDto> getAllContentIndex() {
        List<ContentIndex> contentIndicesList = contentIndexRepository.findAll();
        return  contentIndicesList.stream().map(ContentIndex::getContentIndexDto).collect(Collectors.toList());
    }
    @Override
    public List<ContentIndexDto> getAllContentIndexWithLevel(int level) {
        List<ContentIndex> allContentIndex = contentIndexRepository.findAll();
        List<ContentIndexDto> result = new ArrayList<>();
        for (ContentIndex contentIndex : allContentIndex) {
            if (getContentIndexLevel(contentIndex) == level) {
                result.add(contentIndex.getContentIndexDto());
            }
        }
        return result;
    }

    private int getContentIndexLevel(ContentIndex contentIndex) {
        int level = 0;
        ContentIndex parentIndex = contentIndex.getContentIndex();
        while (parentIndex != null) {
            level++;
            parentIndex = parentIndex.getContentIndex();
        }
        return level;
    }
}