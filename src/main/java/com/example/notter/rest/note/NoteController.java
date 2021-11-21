package com.example.notter.rest.note;

import com.example.notter.config.security.CustomUserDetails;
import com.example.notter.rest.note.model.Note;
import com.example.notter.rest.note.model.NoteRequest;
import com.example.notter.rest.note.model.Todo;
import com.example.notter.rest.note.model.TodoRequest;
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

    @PostMapping("/{noteId}/todo")
    public @ResponseBody
    Todo addTodo(
            @PathVariable Integer noteId,
            @AuthenticationPrincipal CustomUserDetails user,
            @Valid @RequestBody TodoRequest todo
    ) {
        return noteService.addTodo(user.getUserEntity(), noteId, todo);
    }

    @PutMapping("/{noteId}/todo/{todoId}")
    public @ResponseBody
    Todo updateTodo(
            @PathVariable Integer noteId,
            @PathVariable Integer todoId,
            @AuthenticationPrincipal CustomUserDetails user,
            @Valid @RequestBody TodoRequest todo
    ) {
        return noteService.updateTodo(user.getUserEntity(), noteId, todoId, todo);
    }

    @DeleteMapping("/{noteId}/todo/{todoId}")
    public @ResponseBody
    ResponseEntity<String> deleteTodo(
            @PathVariable Integer noteId,
            @PathVariable Integer todoId,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        noteService.deleteTodo(user.getUserEntity(), noteId, todoId);
        return ResponseEntity.ok("Success");
    }
}
