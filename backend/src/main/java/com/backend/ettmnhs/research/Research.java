package com.backend.ettmnhs.research;

import java.util.List;

public class Research {
        private byte[] coverImage;
        private String title;
        private List<String> authors;
        private String datePublished;
        private List<String> researchAdvisers;
        private List<String> keywords;
        private List<byte[]> abstractImgs;

    public String getTitle() {
        return title;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDatePublished() {
        return datePublished;
    }

    public void setDatePublished(String datePublished) {
        this.datePublished = datePublished;
    }

    public List<String> getResearchAdvisers() {
        return researchAdvisers;
    }

    public void setResearchAdvisers(List<String> researchAdvisers) {
        this.researchAdvisers = researchAdvisers;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public byte[] getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(byte[] coverImage) {
        this.coverImage = coverImage;
    }

    public List<byte[]> getAbstractImgs() {
        return abstractImgs;
    }

    public void setAbstractImgs(List<byte[]> abstractImgs) {
        this.abstractImgs = abstractImgs;
    }
}
