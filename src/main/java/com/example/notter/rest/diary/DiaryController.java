package com.example.notter.rest.diary;

import com.example.notter.config.security.CustomUserDetails;
import com.example.notter.rest.diary.model.Diary;
import com.example.notter.rest.diary.model.DiaryCreateRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("api/v1/diary")
@Validated
public class DiaryController {
    private final DiaryService diaryService;

    public DiaryController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    @PostMapping
    Diary create(
            @Valid @RequestBody DiaryCreateRequest diary,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return diaryService.create(diary, user.getUserEntity());
    }

    @GetMapping
    List<Diary> getByRange(
            @Valid @RequestParam Long from,
            @Valid @RequestParam Long to,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        var fromDate = new Date(from);
        var toDate = new Date(to);
        return diaryService.getByRange(fromDate, toDate, user.getUserEntity());
    }
}
