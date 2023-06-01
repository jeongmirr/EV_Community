package com.example.evcommunity;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

@Service
public class DataService {

    public static ResponseEntity<String> getDataFromExternalAPI() {
        String serviceKey = "6xk3T5zCLTkhm84UIXwfRAWfy3HLK+F58rTffcvJ6ORZ/CWugL/MO+N+nyYyCzvHwEO8HIpcaa6O+AwpV02xXQ==";
        String apiUrl = "http://openapi.kepco.co.kr/service/EvInfoServiceV2/getEvSearchList";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("ServiceKey", serviceKey);
        headers.setContentType(MediaType.APPLICATION_XML);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<byte[]> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, byte[].class);

        String xmlString;
        try {
            xmlString = new String(response.getBody(), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            // Handle encoding exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing the response.");
        }

        return ResponseEntity.ok(xmlString);
    }


    public static void saveDataToDatabase(String jsonData) {
        XmlMapper xmlMapper = new XmlMapper();

        try {
            JsonNode root = xmlMapper.readTree(jsonData);
            String jsonDataString = jsonData.toString();
            System.out.println("jsonData : " + jsonDataString);
            JsonNode items = root.path("body").path("items").path("item");

            System.out.println("items");
            System.out.println(items.toString());

            String url = "jdbc:mysql://localhost:3306/temp";
            String username = "id";
            String password = "pwd";
            Connection connection = DriverManager.getConnection(url, username, password);

            String sql = "INSERT INTO data (addr, chargeTp, cpId, cpNm, cpStat, cpTp, csId, csNm, lat, longi, statUpdateDatetime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(sql);

            for (JsonNode item : items) {
                statement.setString(1, item.path("addr").asText());
                statement.setString(2, item.path("chargeTp").asText());
                statement.setString(3, item.path("cpId").asText());
                statement.setString(4, item.path("cpNm").asText());
                statement.setString(5, item.path("cpStat").asText());
                statement.setString(6, item.path("cpTp").asText());
                statement.setString(7, item.path("csId").asText());
                statement.setString(8, item.path("csNm").asText());
                statement.setString(9, item.path("lat").asText());
                statement.setString(10, item.path("longi").asText());
                statement.setString(11, item.path("statUpdateDatetime").asText());

                statement.executeUpdate();
            }

            statement.close();
            connection.close();

            System.out.println("Data saved to the database successfully.");
        } catch (Exception e) {
            System.out.println("Error occurred while saving data to the database.");
            e.printStackTrace();
        }
    }
}
