package com.thesishiudsa.services.Content;

import com.thesishiudsa.dto.ContentDto;
import com.thesishiudsa.entity.Content;

import java.util.List;

public interface ContentService {
    List<ContentDto> getAllContent();

    Content getContentByContentIndexId(Long contentIndexId);
}
