package com.example.agrotechsolutions.services;

import com.example.agrotechsolutions.entities.ExternalTransfer;
import com.example.agrotechsolutions.entities.InventaireInitial;
import com.example.agrotechsolutions.entities.Vendor;
import com.example.agrotechsolutions.repositories.InventaireInitialRepo;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;
import com.example.agrotechsolutions.services.email.MailSender;
import com.example.agrotechsolutions.services.email.MailService;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
@Service
@Slf4j
public class InventaireInitialServicesImpl  implements InventaireInitialServices {
    @Autowired
    InventaireInitialRepo inventaireInitialRepo;
    @Autowired
    private MailSender mailSender;
    @Override
    public InventaireInitial addInventaireInitial(InventaireInitial inventaireInitial) {
        return inventaireInitialRepo.save(inventaireInitial);
    }

    @Override
    public Page<InventaireInitial> getpagesInventaireInitial(int pageSize, int pageNumber, String filter) {
        Pageable pageable = PageRequest.of(pageSize,pageNumber);
        Page<InventaireInitial> result = inventaireInitialRepo.findByIsDeletedAndNomDuProduitContainingIgnoreCase(false, filter, pageable);
        return result;

    }




    /*
    @Override
    public Page<InventaireInitial> findAll(int pageSize, int pageNumber,String filter) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("nomDuProduit").ascending());
        return inventaireInitialRepo.findAll(pageable);
    }
     */
    @Override
    public Page<InventaireInitial> getpagesarchive(int pageSize, int pageNumber, String filter) {
        Pageable pageable = PageRequest.of(pageSize, pageNumber, Sort.by("nomDuProduit").ascending());
        Page<InventaireInitial> result = inventaireInitialRepo.findByIsDeletedAndNomDuProduitContainingIgnoreCase(true, filter, pageable);

        return result;
    }

    @Override
    public void archiveInventaireInitial(String id) throws NotFoundException {
        Optional<InventaireInitial> groOptional = inventaireInitialRepo.findById(id);
        InventaireInitial groExisting = groOptional.get();
        groExisting.setIsDeleted(true);
        inventaireInitialRepo.save(groExisting);
    }

    @Override
    public void desarchiveInventaireInitial(String id) throws NotFoundException {
        Optional<InventaireInitial> groOptional = inventaireInitialRepo.findById(id);
        InventaireInitial groExisting = groOptional.get();
        groExisting.setIsDeleted(false);
        inventaireInitialRepo.save(groExisting);
    }

    @Override
    public void deleteInventaireInitial(String id) {

        inventaireInitialRepo.deleteById(id);
    }

    @Override
    public void ExportInventaireInitialToCsv(HttpServletResponse servletResponse) throws IOException {
        List<InventaireInitial> inventaires = inventaireInitialRepo.findAll();

        String filename = "Inventaires-Initiaux.csv";
        String csvContent = ConvertInventaireInitialToCsv(inventaires);

        servletResponse.setContentType("text/csv");
        servletResponse.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + filename);

        servletResponse.getOutputStream().print(csvContent);
    }

    @Override
    public String ConvertInventaireInitialToCsv(List<InventaireInitial> inventaires) throws IOException {
        StringWriter writer = new StringWriter();
        CSVFormat format = CSVFormat.DEFAULT
                .withHeader("Code de transaction", "Date de l'évènement ", "Date d'expiration ", "Temps", "Code de référence", "Commentaire")
                .withDelimiter(',');
        try (CSVPrinter csvPrinter = new CSVPrinter(writer, format)) {
            for (InventaireInitial inventaireInitial : inventaires) {
                csvPrinter.printRecord(inventaireInitial.getCodeDeTransaction(), inventaireInitial.getDateDeEvenement(), inventaireInitial.getDateExpiration(), inventaireInitial.getTemps(), inventaireInitial.getCodeDeReference(), inventaireInitial.getCommentaire()
                );
            }
        } catch (IOException e) {
            log.error("Error while writing CSV", e);
        }

        return writer.toString();
    }
    @Override
    public ResponseEntity<Void> importCSV(MultipartFile file) {
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

                    // Process and save each row of data to MongoDB
                    for (int i = 1; i < rows.size(); i++) { // Start from index 1 to skip the header row
                        String[] row = rows.get(i);
                        // Trim leading and trailing spaces from each cell
                        for (int j = 0; j < row.length; j++) {
                            row[j] = row[j].trim();
                        }
                        System.out.println("Row Data: " + Arrays.toString(row));

                        if (row.length != 7) {
                            System.err.println("Error: Row at index " + i + " has insufficient columns: " + Arrays.toString(row));
                            continue; // Skip this row
                        }

                        // Create an instance of your MongoDB document class
                        InventaireInitial document = new InventaireInitial();
                        ZoneId zoneId = ZoneId.of("Africa/Tunis"); // Use the correct time zone

                        try {
                            // Set codeDeTransaction (assuming it's a string)
                            String codeDeTransaction = row[0];
                            if (codeDeTransaction != null && !codeDeTransaction.isEmpty()) {
                                document.setCodeDeTransaction(codeDeTransaction);
                            }

                            String dateEvenementStr = row[1];
                            if (dateEvenementStr != null && !dateEvenementStr.isEmpty()) {
                                LocalDate dateDeEvenement = LocalDate.parse(dateEvenementStr, DateTimeFormatter.ofPattern("dd/MM/yyyy").withZone(zoneId));
                                document.setDateDeEvenement(dateDeEvenement);
                            }

// Convert dateExpiration from String to LocalDate without specifying time zone
                            String dateExpirationStr = row[2];
                            if (dateExpirationStr != null && !dateExpirationStr.isEmpty()) {
                                LocalDate dateExpiration = LocalDate.parse(dateExpirationStr, DateTimeFormatter.ofPattern("dd/MM/yyyy").withZone(zoneId));
                                document.setDateExpiration(dateExpiration);
                            }

// Convert temps from String to LocalTime without specifying time zone
                            String tempsStr = row[3];
                            if (tempsStr != null && !tempsStr.isEmpty()) {
                                LocalTime temps = LocalTime.parse(tempsStr, DateTimeFormatter.ofPattern("HH:mm:ss").withZone(zoneId));
                                document.setTemps(temps);
                            }

                            // Convert codeDeReference from String to Double
                            String codeDeReferenceStr = row[4];
                            if (codeDeReferenceStr != null && !codeDeReferenceStr.isEmpty()) {
                                Double codeDeReference = Double.parseDouble(codeDeReferenceStr);
                                document.setCodeDeReference(codeDeReference);
                            }

                            // Set commentaire (assuming it's a string)
                            String commentaire = row[5];
                            if (commentaire != null && !commentaire.isEmpty()) {
                                document.setCommentaire(commentaire);
                            }
                            String videStr = row[6]; // Assuming that 'vide' is at index 5 in your CSV row
                            if (videStr != null && !videStr.isEmpty()) {
                                Boolean vide = Boolean.parseBoolean(videStr);
                                document.setVide(vide);
                            }
                            // Save the document to MongoDB
                            inventaireInitialRepo.save(document);
                        } catch (DateTimeParseException | NumberFormatException e) {
                            // Handle parsing errors by logging and continuing
                            System.err.println("Error parsing date or double at row index " + i + ": " + e.getMessage());
                            System.err.println("Problematic row data: " + Arrays.toString(row));
                        }
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
    @Override
    public void generatePdf(HttpServletResponse servletResponse) throws IOException {
        List<InventaireInitial> inventaires = inventaireInitialRepo.findAll(); // Fetch inventaires from the repository
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        // Initialize PDF writer and document
        PdfWriter writer = new PdfWriter(outputStream);
        PdfDocument pdf = new PdfDocument(new PdfWriter(outputStream));
        Document doc = new Document(pdf, PageSize.A4);

// Set up fonts
        PdfFont font = PdfFontFactory.createFont();

        // Add a title to the PDF
        Paragraph title = new Paragraph("Inventaires Initiaux")
                .setFont(font)
                .setFontSize(24)
                .setMarginTop(20)
                .setMarginBottom(20);
        doc.add(title);

        int itemNumber = 1; // Initialize a counter for item numbers
        for (InventaireInitial inventaire : inventaires) {
            // Create a Paragraph for the item number and apply underline
            Paragraph itemNumberParagraph = new Paragraph("Inventaire N° " + itemNumber);
            itemNumberParagraph.setUnderline(); // Apply underline
            doc.add(itemNumberParagraph);
            doc.add(new Paragraph("Code de Transaction: " + inventaire.getCodeDeTransaction()));
            doc.add(new Paragraph("Date de l'Événement: " + inventaire.getDateDeEvenement()));
            doc.add(new Paragraph("Date d'Expiration: " + inventaire.getDateExpiration()));
            doc.add(new Paragraph("Commentaire: " + inventaire.getCommentaire()));
            doc.add(new Paragraph("Vide: " + inventaire.getVide()));

            // Add more fields as needed
            doc.add(new Paragraph("\n")); // Add some space between inventaires
            itemNumber++;
        }

        // Close the PDF document
        doc.close();

        // Set the response headers
        servletResponse.setContentType("application/pdf");
        servletResponse.setHeader("Content-Disposition", "attachment; filename=Inventaires-Initiaux.pdf");

        // Write the PDF content to the response output stream
        servletResponse.getOutputStream().write(outputStream.toByteArray());
    }

    @Override
    //@Scheduled(cron = "0 * * * * ?")
    @Scheduled(cron = "0 0 8 * * MON") // Schedule to run every Monday at 8 AM
    public void sendEmailInventaireInitialReport() {
        log.info("***************Scheduled task started...");
        try {
            List<InventaireInitial> archivedInventaires = inventaireInitialRepo.findByIsDeleted(true);
       //     List<InventaireInitial> unarchivedInventaires = inventaireInitialRepo.findByIsDeleted(true);

            String subject = "Weekly Inventory Archive Report";
            String body = "Archived Inventaires:\n";
            for (InventaireInitial item : archivedInventaires) {
                body += "Transaction code: " + item.getCodeDeTransaction() + "\n";
                body += "Comment : " + item.getCommentaire() + "\n";
                body += "Void: " + item.getVide() + "\n";
                body += "Time: " + item.getTemps() + "\n";
                body += "Event date: " + item.getDateDeEvenement() + "\n";

            }

            // Send the email
            String adminEmail = "liliyyy1758@gmail.com"; // Admin's mail
            mailSender.sendEmail(adminEmail, subject, body);
            log.info("***********mail sent ");
        } catch (Exception e) {
            // Handle exceptions if needed
            log.error("***************Error sending email:", e);

        }
    }
    @Override
    public List<InventaireInitial> searchInventairesInitiaux( Float prixunitaire,String NomDuProduit) {

        if (NomDuProduit == null && prixunitaire == null) {
            return inventaireInitialRepo.findAll();
        } else if (NomDuProduit != null && prixunitaire == null) {
            return inventaireInitialRepo.findByNomDuProduitContainingIgnoreCase(NomDuProduit);
        } else if (NomDuProduit == null && prixunitaire != null) {
            return inventaireInitialRepo.findByPrixUnitaire(prixunitaire);
        } else {
            return inventaireInitialRepo.findByPrixUnitaireAndNomDuProduitContainingIgnoreCase(prixunitaire,NomDuProduit);
        }

    }
}