package com.thesishiudsa.entity;
import com.thesishiudsa.dto.ContentDto;
import com.thesishiudsa.dto.ContentIndexDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "content")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "contentIndexId", nullable = false)
    private ContentIndex contentIndex;

    public ContentDto getContentDto() {
        ContentDto contentDto = new ContentDto();
        contentDto.setId(id);
        contentDto.setContent(content);
        contentDto.setContentIndexId(contentIndex.getId());
        return contentDto;
    }
}
