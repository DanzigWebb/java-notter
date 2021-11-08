package com.example.notter.rest.note;

import com.example.notter.config.CustomUserDetails;
import com.example.notter.rest.note.model.Note;
import com.example.notter.rest.note.model.NoteRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("api/v1/note")
@Validated
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping()
    public @ResponseBody
    Note create(
            @Valid @RequestBody NoteRequest note,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return noteService.create(note, user.getUserEntity());
    }

    @GetMapping()
    public @ResponseBody
    List<Note> getAllByUser(@AuthenticationPrincipal CustomUserDetails user) {
        return noteService.getAllByUser(user.getUserEntity().getId());
    }

    @PutMapping("/{noteId}")
    public @ResponseBody
    Note update(
            @PathVariable Integer noteId,
            @Valid @RequestBody NoteRequest note,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return noteService.update(noteId, note, user.getUserEntity());
    }

    @DeleteMapping("/{noteId}")
    public @ResponseBody
    ResponseEntity<String> delete(
            @PathVariable Integer noteId,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        noteService.delete(user.getUserEntity(), noteId);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/{noteId}")
    public @ResponseBody
    Note getById(
            @PathVariable Integer noteId,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return noteService.getByUserAndId(user.getUserEntity(), noteId);
    }
}
