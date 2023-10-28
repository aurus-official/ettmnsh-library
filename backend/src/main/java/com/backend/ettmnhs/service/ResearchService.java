package com.backend.ettmnhs.service;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.awt.image.BufferedImage;

import com.backend.ettmnhs.research.Query;
import com.backend.ettmnhs.research.Research;


import java.util.Scanner;
import java.util.stream.*;

import javax.imageio.ImageIO;

@Service
public class ResearchService {
    public List<Research> fetchAll() throws IOException {
        try {
            File directoryPath = new File(".././research-dir/");
            String researchTitles[] = directoryPath.list(new FilenameFilter() {
                @Override
                public boolean accept(File current, String name) {
                    return new File(current, name).isDirectory();
                }
            });
            List<Research> matchedResearches = this.process(researchTitles);

            return matchedResearches;

        } catch (Exception ex) {
            throw(ex);
        }
    }

    public List<Research> queryInput(Query query, List<Research> researchList) throws IOException {
        String queryItself = query.getInput().toLowerCase().trim();

        List<Research> filteredResearches = researchList.stream()
            .filter(res -> res.getTitle().contains(queryItself))
            .collect(Collectors.toList());
        return filteredResearches;
    }

    private List<Research> process(String[] allTitles) throws IOException {
        List<Research> listOfResearches = new ArrayList<>();
        int counter = 0;
        assert allTitles != null;
        for (String researchTitle : allTitles) {
            File eachResearch = new File(String.format(".././research-dir/%s/info.txt", researchTitle));
            String abstractList[] = new File(String.format(".././research-dir/%s/abstract/", researchTitle)).list();
            Scanner fileReader = new Scanner(eachResearch);
            Research resTemp = new Research();
            resTemp.setTitle(researchTitle);

            File coverImg = new File(String.format(".././research-dir/%s/testing.jpg", researchTitle));
            BufferedImage bfImg = ImageIO.read(coverImg);
            ByteArrayOutputStream bosCover = new ByteArrayOutputStream();
            ImageIO.write(bfImg, "jpg", bosCover);
            resTemp.setCoverImage(bosCover.toByteArray());

            while (fileReader.hasNextLine()) {
                String data = fileReader.nextLine();

                switch(counter++) {
                    case 0 -> {
                        List<String> authorsTemp = Arrays.asList(data.split(", "));
                        resTemp.setAuthors(authorsTemp);
                    }
                    case 1 -> resTemp.setDatePublished(data);
                    case 2 -> {
                        List<String> resAdviTemp = Arrays.asList(data.split(", "));
                        resTemp.setResearchAdvisers(resAdviTemp);
                    }
                    case 3 -> {
                        List<String> keywordsTemp = Arrays.asList(data.split(", "));
                        resTemp.setKeywords(keywordsTemp);
                    }
                }
            }
            counter = 0;
            listOfResearches.add(resTemp);

            List<byte[]> abstImgTemp = new ArrayList<byte[]>();
            for (String abstrImg : abstractList) {
                File absImg = new File(String.format(".././research-dir/%s/abstract/%s", researchTitle, abstrImg));
                BufferedImage bfImgAbs = ImageIO.read(absImg);
                ByteArrayOutputStream bosAbs = new ByteArrayOutputStream();
                ImageIO.write(bfImgAbs, "jpg", bosAbs);
                abstImgTemp.add(bosAbs.toByteArray());
            }
            resTemp.setAbstractImgs(abstImgTemp);
            fileReader.close();
        }
        return listOfResearches;
    }
}
