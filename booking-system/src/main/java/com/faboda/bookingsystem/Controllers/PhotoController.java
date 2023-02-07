package com.faboda.bookingsystem.Controllers;

import com.faboda.bookingsystem.Services.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/photo")
public class PhotoController {

    private static final String MESSAGE_1 = "Uploaded the file successfully";
    private static final String FILE_NAME = "fileName";

    @Autowired
    PhotoService photoService;

    @GetMapping
    public ResponseEntity<Object> findByName(@RequestBody(required = false) Map<String, String> params) {

        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noCache())
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + params.get(FILE_NAME) + "\"")
                .body(new InputStreamResource(photoService.findByName(params.get(FILE_NAME))));
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable("fileName") String fileName){
        byte [] data = photoService.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("content-type","application/octet-stream")
                .header("content-disposition", "attachment; filename\""+fileName+"\"")
                .body(resource);
    }



    @PostMapping
    public ResponseEntity<Object> save(@RequestParam("file") MultipartFile multipartFile) {
        photoService.save(multipartFile);
        return new ResponseEntity<>(MESSAGE_1, HttpStatus.OK);
    }

    }