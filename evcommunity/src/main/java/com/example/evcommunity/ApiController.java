package com.example.evcommunity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import static com.example.evcommunity.DataService.saveDataToDatabase;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private DataService dataService;

    @GetMapping("/data")
    public void saveDataFromExternalAPI() {
        ResponseEntity<String> response = dataService.getDataFromExternalAPI();
        if (response.getStatusCode().is2xxSuccessful()) {
            String jsonData = (String) response.getBody();
            saveDataToDatabase(jsonData);
        } else {
            System.out.println("Error occurred while fetching data from the API.");
        }
    }



}
