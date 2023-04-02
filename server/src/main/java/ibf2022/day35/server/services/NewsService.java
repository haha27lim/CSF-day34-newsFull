package ibf2022.day35.server.services;

import java.io.StringReader;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import ibf2022.day35.server.models.Article;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class NewsService {

    // The URL for the top headlines endpoint of the news API
    public static final String NEWS_API = "https://newsapi.org/v2/top-headlines";

    // The API key used to authenticate with the news API
    @Value("${news.key}")
    private String newsKey;

    public List<Article> getNews(String country, String category, int pageSize) {
        // Construct the URL for the news API request using UriComponentsBuilder
        String url = UriComponentsBuilder.fromUriString(NEWS_API)
                .queryParam("country", country)
                .queryParam("category", category)
                .queryParam("pageSize", pageSize)
                .queryParam("apiKey", newsKey)
                .toUriString();

        // Build a request entity for the news API request
        RequestEntity<Void> req = RequestEntity.get(url)
                .accept(MediaType.APPLICATION_JSON)
                .build();

        // Create a new RestTemplate for making the request
        RestTemplate template = new RestTemplate();

        ResponseEntity<String> resp = null;

        try {
            // Send the request to the news API and get the response entity
            resp = template.exchange(req, String.class);
        } catch (RestClientException ex) {
            // If an exception is thrown, print the stack trace and return an empty list of articles
            ex.printStackTrace();
            return Collections.EMPTY_LIST;
        }

        // Get the response payload as a string
        String payload = resp.getBody();

        // Parse the JSON payload using the Java EE JSONReader API
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject newsResp = reader.readObject();
        JsonArray jsonArr = newsResp.getJsonArray("articles");

        // Convert the JSON articles to a list of Article objects using the Article::toArticle method
        return jsonArr.stream()
            .map(v -> v.asJsonObject())
            .map(Article::toArticle)
            .toList();
    }
    
}
