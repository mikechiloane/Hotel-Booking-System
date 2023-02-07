package com.faboda.bookingsystem.Services;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;

@Service
public class PhotoService {


    @Autowired
    private AmazonS3 amazonS3;

    @Value("${s3.bucket.name}")
    private String s3BucketName;

    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (IOException e) {
            System.out.println(e.toString());
        }
        System.out.println(file.toPath());

        return file;
    }


    @Async("threadPoolTaskExecutor")
    public S3ObjectInputStream findByName(String fileName) {
        return amazonS3.getObject(s3BucketName, fileName).getObjectContent();
    }

    public byte[]downloadFile(String fileName){
        S3Object s3Object = amazonS3.getObject(s3BucketName,fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            System.out.println(e);
            throw new RuntimeException(e);
        }
    }

    @Async
    public void save(final MultipartFile multipartFile) {
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            final String fileName = file.getName();
            System.out.println(fileName);
            final PutObjectRequest putObjectRequest = new PutObjectRequest(s3BucketName, fileName, file);
            try{
                amazonS3.putObject(putObjectRequest);
            }
            catch (Exception e){
                System.out.println(e);
            }
            Files.delete(file.toPath());
        } catch (AmazonServiceException e) {
            System.out.println(e);
        } catch (IOException ex) {
            System.out.println(ex);
        }
    }

}