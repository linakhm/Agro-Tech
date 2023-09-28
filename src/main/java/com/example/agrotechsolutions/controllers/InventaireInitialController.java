package com.example.agrotechsolutions.controllers;
import com.example.agrotechsolutions.entities.InventaireInitial;
import com.example.agrotechsolutions.entities.Vendor;
import com.example.agrotechsolutions.services.ExternalTransferServices;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.example.agrotechsolutions.services.InventaireInitialServices;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import org.slf4j.Logger;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/InventaireInitial")
public class InventaireInitialController {
    private static final Logger logger = LoggerFactory.getLogger(InventaireInitial.class);

    @Autowired
    InventaireInitialServices inventaireInitialServices;

    @PostMapping("")
    public InventaireInitial addInventaireInitial(@RequestBody InventaireInitial inventaireInitial) {
        logger.debug("Received data from front end: {}", inventaireInitial.toString());
        return inventaireInitialServices.addInventaireInitial(inventaireInitial);


    }

    /* @GetMapping("")
     public ResponseEntity<?> findAll() {
         List<InventaireInitial> response = inventaireInitialServices.findAll();
         return new ResponseEntity<>(response, HttpStatus.OK);
     }*/
    @GetMapping("/page")
    public ResponseEntity<?> findPage(
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "") String filter
    ) {
        Page<InventaireInitial> response = inventaireInitialServices.getpagesInventaireInitial(pageNumber,pageSize, filter);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/archiver/{id}")
    public ResponseEntity<?> archive(@PathVariable String id) throws NotFoundException {
        inventaireInitialServices.archiveInventaireInitial(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")

    public void deleteInventaireInitial(@PathVariable("id") String id) {
        inventaireInitialServices.deleteInventaireInitial(id);

    }

    @GetMapping("/desarchiver/{id}")
    public ResponseEntity<?> setNotArchive(@PathVariable String id) throws NotFoundException {
        inventaireInitialServices.desarchiveInventaireInitial(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/archived/page")
    public ResponseEntity<?> findArchivedPage(
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "") String filter
    ) {
        Page<InventaireInitial> response = inventaireInitialServices.getpagesarchive(pageSize, pageNumber, filter);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/CSV")
    public void ExportInventaireInitialToCsv(HttpServletResponse servletResponse) throws java.io.IOException {
        inventaireInitialServices.ExportInventaireInitialToCsv(servletResponse);
        log.info("********************* export called in backend");

    }

    /*
    @PostMapping("/importCSV")
    @ResponseBody
    public ResponseEntity<Void> importCSV(@RequestParam("file") MultipartFile file) {
        try {
            if (file != null) {
                InputStream inputStream = file.getInputStream();
                if (inputStream != null) {
                    Reader reader = new InputStreamReader(inputStream);
                    CSVReader csvReader = new CSVReaderBuilder(reader)
                            .withCSVParser(new CSVParserBuilder().withSeparator(';').build())
                            .build();

                    // Read all the rows from the CSV file
                    List<String[]> rows = csvReader.readAll();

                    // Process each row of data
                    for (String[] row : rows) {
                        if (row.length != 6) {
                            // Handle rows with insufficient columns
                            System.err.println("Row has insufficient columns: " + Arrays.toString(row));
                            continue; // Skip this row and continue with the next one
                        }

                        String codeDeTransaction = row[0];
                        String dateDeEvenement = row[1];
                        String dateExpiration = row[2];
                        String temps = row[3];
                        String codeReference = row[4];
                        String commentaire = row[5];

                        // Save the data to the database or perform other operations
                        // Replace the println statements with your database operations
                        System.out.println("Code de Transaction: " + codeDeTransaction);
                        System.out.println("Date de l'Événement: " + dateDeEvenement);
                        System.out.println("Date d'Expiration: " + dateExpiration);
                        System.out.println("Temps: " + temps);
                        System.out.println("Code de Référence: " + codeReference);
                        System.out.println("Commentaire: " + commentaire);
                    }

                    // Close the CSVReader
                    csvReader.close();
                    log.info("*********************import called in backend");

                    // Return a success response
                    return ResponseEntity.ok().build();
                } else {
                    // Handle the case where the input stream is null
                    return ResponseEntity.badRequest().build();
                }
            } else {
                // Handle the case where 'file' is null
                return ResponseEntity.badRequest().build();
            }
        } catch (IOException | CsvException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

*/
    @GetMapping("/searchInventory")
    public ResponseEntity<List<InventaireInitial>> searchVendors(
            @RequestParam(required = false) float price,
            @RequestParam(required = false) String name) {
        List<InventaireInitial> inventories = inventaireInitialServices.searchInventairesInitiaux(price,name);
        return new ResponseEntity<>(inventories, HttpStatus.OK);
    }

    @PostMapping("/importCSV")
    @ResponseBody
    public ResponseEntity<Void> importCSV(@RequestBody MultipartFile file) {

        return inventaireInitialServices.importCSV(file);
    }
    @GetMapping("/pdf")
    public void exportInventaireToPdf(HttpServletResponse response) throws IOException {
 // Fetch your list of inventaires from a service or repository
                inventaireInitialServices.generatePdf(response);
    }
    @GetMapping("/Mail-Archive-Report")
    public void getDailyArchiveReport() {
        inventaireInitialServices.sendEmailInventaireInitialReport();
    }
}