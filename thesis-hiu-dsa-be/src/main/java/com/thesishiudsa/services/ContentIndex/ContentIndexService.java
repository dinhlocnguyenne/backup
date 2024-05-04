package com.thesishiudsa.services.ContentIndex;

import com.thesishiudsa.dto.ContentIndexDto;


import java.util.List;

public interface ContentIndexService {
    List<ContentIndexDto> getAllContentIndex();
    List<ContentIndexDto> getAllContentIndexWithLevel(int level);
}

