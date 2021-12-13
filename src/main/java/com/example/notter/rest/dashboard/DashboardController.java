package com.example.notter.rest.dashboard;

import com.example.notter.config.security.CustomUserDetails;
import com.example.notter.rest.dashboard.model.Dashboard;
import com.example.notter.rest.dashboard.model.DashboardCreateRequest;
import com.example.notter.rest.dashboard.model.DashboardUpdateRequest;
import com.example.notter.rest.group.model.GroupRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("api/v1/dashboard")
@Validated
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @PostMapping
    public @ResponseBody
    Dashboard create(
            @Valid @RequestBody DashboardCreateRequest dash,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return dashboardService.create(dash, user.getUserEntity());
    }

    @PutMapping("{dashboardId}")
    public @ResponseBody
    Dashboard create(
            @PathVariable Integer dashboardId,
            @Valid @RequestBody DashboardUpdateRequest dash,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return dashboardService.update(dash, dashboardId, user.getUserEntity());
    }
}
