package com.whyt.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    // 기본 페이지 요청 메서드
    @GetMapping("/")
    public String index() {
        return "index"; // => resources에 templates 폴더 안에 있는 index.html을 찾아감
    }
}
